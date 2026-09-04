const { MessageEmbed } = require("discord.js");
const db = require("croxydb");

module.exports = {
  slash: true,
  name: ['log'],
  description: 'Sunucu mesaj ve giriş-çıkış log kanalları ayarı.',
  subcommands: [
    {
      name: 'mesaj',
      description: 'Silinen veya düzenlenen mesajların kaydedileceği log kanalını ayarlar.',
      options: [
        {
          name: 'islem',
          description: 'Ayarla veya Sıfırla',
          type: 'string',
          require: true,
          choices: [
            { name: 'Kanalı Ayarla', value: 'ayarla' },
            { name: 'Sıfırla', value: 'sifirla' }
          ]
        },
        { name: 'kanal', description: 'Mesaj log kanalı (Ayarla seçildiğinde)', type: 'channel', require: false }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const islem = interaction.options.getString('islem');
        const gid = interaction.guild.id;

        if (islem === 'ayarla') {
          const kanal = interaction.options.getChannel('kanal');
          if (!kanal) return interaction.reply({ content: "Lütfen bir log kanalı belirtin.", ephemeral: true });
          db.set(`log_${gid}`, kanal.id);
          return interaction.reply({ content: `✅ Mesaj log kanalı başarıyla <#${kanal.id}> olarak ayarlandı.` });
        } else {
          db.delete(`log_${gid}`);
          return interaction.reply({ content: "🗑️ Mesaj log kanalı başarıyla sıfırlandı." });
        }
      }
    },
    {
      name: 'hgbb',
      description: 'Sunucuya giren ve çıkanların bildirileceği hoş geldin kanalını ayarlar.',
      options: [
        {
          name: 'islem',
          description: 'Ayarla veya Sıfırla',
          type: 'string',
          require: true,
          choices: [
            { name: 'Kanalı Ayarla', value: 'ayarla' },
            { name: 'Sıfırla', value: 'sifirla' }
          ]
        },
        { name: 'kanal', description: 'Hoş geldin kanalı (Ayarla seçildiğinde)', type: 'channel', require: false }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `SUNUCUYU YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const islem = interaction.options.getString('islem');
        const gid = interaction.guild.id;

        if (islem === 'ayarla') {
          const kanal = interaction.options.getChannel('kanal');
          if (!kanal) return interaction.reply({ content: "Lütfen bir hoş geldin kanalı belirtin.", ephemeral: true });
          db.set(`cshgbb.${gid}`, kanal.id);
          return interaction.reply({ content: `✅ Hoş Geldin - Güle Güle kanalı başarıyla <#${kanal.id}> olarak ayarlandı.` });
        } else {
          db.delete(`cshgbb.${gid}`);
          return interaction.reply({ content: "🗑️ Hoş Geldin - Güle Güle sistemi başarıyla kapatıldı." });
        }
      }
    }
  ]
};
