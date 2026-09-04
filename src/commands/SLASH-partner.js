const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("croxydb");

module.exports = {
  slash: true,
  name: ['partner'],
  description: 'Gelişmiş sunucular arası partnerlik sistemi.',
  subcommands: [
    {
      name: 'ol',
      description: 'Belirttiğiniz ID\'deki sunucuya partnerlik isteği gönderirsiniz.',
      options: [
        { name: 'sunucu_id', description: 'İstek gönderilecek sunucunun IDsi', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        const gid = interaction.guild.id;
        const hedefId = interaction.options.getString('sunucu_id');

        const kanal = db.fetch(`partnerkanal_${gid}`);
        if (!kanal) return interaction.reply({ content: "Sunucunuzun partner kanalı ayarlanmamış! `/partner kanal` ile ayarlayın.", ephemeral: true });

        const log = db.fetch(`partnerlog_${gid}`);
        if (!log) return interaction.reply({ content: "Sunucunuzun partner log kanalı ayarlanmamış! `/partner log` ile ayarlayın.", ephemeral: true });

        const text = db.fetch(`partnertext_${gid}`);
        if (!text) return interaction.reply({ content: "Sunucunuzun partner tanıtım metni ayarlanmamış! `/partner yazi` ile ayarlayın.", ephemeral: true });

        const hedefKanal = db.fetch(`partnerkanal_${hedefId}`);
        const hedefLog = db.fetch(`partnerlog_${hedefId}`);
        const hedefText = db.fetch(`partnertext_${hedefId}`);

        if (!hedefKanal || !hedefLog || !hedefText) {
          return interaction.reply({ content: "Hedef sunucunun partner sistemi (kanal, log veya yazı) henüz tam olarak ayarlanmamış.", ephemeral: true });
        }

        const hedefLogChannel = client.channels.cache.get(hedefLog);
        if (!hedefLogChannel) {
          return interaction.reply({ content: "Hedef sunucunun log kanalına erişilemiyor.", ephemeral: true });
        }

        const embed = new MessageEmbed()
          .setTitle("🤝 Yeni Bir Partnerlik İsteği Geldi!")
          .setColor("#3498db")
          .setDescription(`**İstek Gönderen Sunucu:** ${interaction.guild.name} \`(${interaction.guild.id})\`\n**İsteği Gönderen Yetkili:** ${interaction.user}`)
          .setTimestamp();

        const row = new MessageActionRow().addComponents(
          new MessageButton().setLabel("Kabul Et").setStyle("SUCCESS").setCustomId("evet"),
          new MessageButton().setLabel("Reddet").setStyle("DANGER").setCustomId("hayır")
        );

        await hedefLogChannel.send({ embeds: [embed], components: [row] }).catch(() => {});
        db.set(`partnerlikbekleniyor_${hedefId}`, gid);

        return interaction.reply({ content: `✅ **${interaction.guild.name}** adına belirtilen sunucuya partnerlik isteği başarıyla gönderildi.` });
      }
    },
    {
      name: 'kanal',
      description: 'Partner tanıtımlarının paylaşılacağı kanalı ayarlar.',
      options: [
        { name: 'kanal', description: 'Partner kanalı', type: 'channel', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const kanal = interaction.options.getChannel('kanal');
        db.set(`partnerkanal_${interaction.guild.id}`, kanal.id);
        return interaction.reply({ content: `✅ Partner kanalı başarıyla <#${kanal.id}> olarak ayarlandı.` });
      }
    },
    {
      name: 'log',
      description: 'Partner isteklerinin düşeceği log kanalını ayarlar.',
      options: [
        { name: 'kanal', description: 'Partner log kanalı', type: 'channel', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const kanal = interaction.options.getChannel('kanal');
        db.set(`partnerlog_${interaction.guild.id}`, kanal.id);
        return interaction.reply({ content: `✅ Partner log kanalı başarıyla <#${kanal.id}> olarak ayarlandı.` });
      }
    },
    {
      name: 'yazi',
      description: 'Sunucunuzun partner tanıtım metnini ayarlar.',
      options: [
        { name: 'metin', description: 'Tanıtım yazınız (Davet linki içerebilir)', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const text = interaction.options.getString('metin');
        db.set(`partnertext_${interaction.guild.id}`, text);
        return interaction.reply({ content: `✅ Partner tanıtım yazınız başarıyla kaydedildi:\n\n${text}` });
      }
    }
  ]
};
