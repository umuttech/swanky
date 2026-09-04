const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("croxydb");

module.exports = {
  slash: true,
  name: ['basvuru'],
  description: 'Yetkili alım ve başvuru sistemi.',
  subcommands: [
    {
      name: 'yap',
      description: 'Yetkili alım başvurusu yaparsınız.',
      async execute(client, interaction) {
        const button = new MessageButton()
          .setLabel('Başvuru Formunu Aç')
          .setStyle("SUCCESS")
          .setCustomId('ytbasvuru');

        const row = new MessageActionRow().addComponents(button);
        return interaction.reply({ content: "Aşağıdaki butona tıklayarak yetkili başvurusunda bulunabilirsiniz:", components: [row], ephemeral: true });
      }
    },
    {
      name: 'kur',
      description: 'Yetkili alım sistemini kurarsınız.',
      options: [
        { name: 'kanal', description: 'Onay / Red bildirim kanalı', type: 'channel', require: true },
        { name: 'log', description: 'Başvuruların iletileceği log kanalı', type: 'channel', require: true },
        { name: 'rol', description: 'Onaylanan üyelere verilecek yetkili rolü', type: 'role', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const kanal = interaction.options.getChannel('kanal');
        const log = interaction.options.getChannel('log');
        const rol = interaction.options.getRole('rol');

        db.set(`basvurukanall_${interaction.guild.id}`, kanal.id);
        db.set(`basvurulogg_${interaction.guild.id}`, log.id);
        db.set(`basvururoll_${interaction.guild.id}`, rol.id);

        const embed = new MessageEmbed()
          .setTitle("✅ Başvuru Sistemi Kuruldu!")
          .setColor("GREEN")
          .addField("Bildirim Kanalı", `<#${kanal.id}>`, true)
          .addField("Başvuru Log", `<#${log.id}>`, true)
          .addField("Yetkili Rolü", `<@&${rol.id}>`, true)
          .setFooter({ text: "Sıfırlamak için: /basvuru kapat" })
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'kapat',
      description: 'Yetkili alım sistemini kapatır.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        db.delete(`basvurukanall_${interaction.guild.id}`);
        db.delete(`basvurulogg_${interaction.guild.id}`);
        db.delete(`basvururoll_${interaction.guild.id}`);

        return interaction.reply({ content: "🗑️ Başvuru sistemi ayarları başarıyla sıfırlandı." });
      }
    }
  ]
};
