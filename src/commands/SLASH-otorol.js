const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  slash: true,
  name: ['otorol'],
  description: 'Gelişmiş otomatik rol verme sistemi.',
  subcommands: [
    {
      name: 'ayarla',
      description: 'Sunucuya yeni katılanlara verilecek otomatik rolü ve kanalı ayarlar.',
      options: [
        { name: 'rol', description: 'Yeni üyelere verilecek rol', type: 'role', require: true },
        { name: 'kanal', description: 'Oto rol bildirim mesajının gönderileceği kanal', type: 'channel', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const role = interaction.options.getRole("rol");
        const channel = interaction.options.getChannel("kanal");

        db.set(`otorol_${interaction.guild.id}`, role.id);
        db.set(`otorolkanal_${interaction.guild.id}`, channel.id);

        const embed = new MessageEmbed()
          .setTitle("✅ OtoRol Kurulumu Başarılı!")
          .setColor("GREEN")
          .setDescription(`OtoRol başarıyla <@&${role.id}> olarak ayarlandı.\nBildirim kanalı: <#${channel.id}>`)
          .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'sifirla',
      description: 'Otorol ayarlarını tamamen sıfırlar.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        db.delete(`otorol_${interaction.guild.id}`);
        db.delete(`otorolkanal_${interaction.guild.id}`);

        return interaction.reply({ content: "🗑️ OtoRol sistemi başarıyla sıfırlandı." });
      }
    }
  ]
};
