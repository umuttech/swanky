const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const cdb = require("croxydb");

module.exports = {
  slash: true,
  name: ['koruma'],
  description: 'Sunucu koruma ve otomatik filtre sistemleri.',
  subcommands: [
    {
      name: 'capslock',
      description: 'Büyük harf (Caps Lock) engelleme sistemini açar veya kapatır.',
      options: [
        {
          name: 'durum',
          description: 'Aç veya Kapat',
          type: 'string',
          require: true,
          choices: [
            { name: 'Aç', value: 'ac' },
            { name: 'Kapat', value: 'kapat' }
          ]
        }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `SUNUCUYU YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const durum = interaction.options.getString('durum');
        if (durum === 'ac') {
          qdb.set(`capslock_${interaction.guild.id}`, true);
          return interaction.reply({ content: "✅ **Caps Lock Engel Sistemi Aktif Edildi!** Fazla büyük harf içeren mesajlar engellenecek." });
        } else {
          qdb.delete(`capslock_${interaction.guild.id}`);
          return interaction.reply({ content: "❌ **Caps Lock Engel Sistemi Kapatıldı.**" });
        }
      }
    },
    {
      name: 'reklam',
      description: 'Sunucuda davet linki ve reklam yapılmasını engeller.',
      options: [
        {
          name: 'durum',
          description: 'Aç veya Kapat',
          type: 'string',
          require: true,
          choices: [
            { name: 'Aç', value: 'ac' },
            { name: 'Kapat', value: 'kapat' }
          ]
        }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `SUNUCUYU YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const durum = interaction.options.getString('durum');
        if (durum === 'ac') {
          qdb.set(`reklamengel_${interaction.guild.id}`, true);
          return interaction.reply({ content: "✅ **Reklam Engel Sistemi Aktif Edildi!** Reklam yapan üyeler uyarılır ve engellenir." });
        } else {
          qdb.delete(`reklamengel_${interaction.guild.id}`);
          return interaction.reply({ content: "❌ **Reklam Engel Sistemi Kapatıldı.**" });
        }
      }
    },
    {
      name: 'saas',
      description: 'Otomatik selam alma (Sa-As) sistemini açar veya kapatır.',
      options: [
        {
          name: 'durum',
          description: 'Aç veya Kapat',
          type: 'string',
          require: true,
          choices: [
            { name: 'Aç', value: 'ac' },
            { name: 'Kapat', value: 'kapat' }
          ]
        }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `MESAJLARI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const durum = interaction.options.getString('durum');
        if (durum === 'ac') {
          cdb.set(`saas_${interaction.guild.id}`, "on");
          return interaction.reply({ content: "✅ **Selam Alma (SA-AS) Sistemi Açıldı!** Selam verildiğinde bot aleyküm selam diyecektir." });
        } else {
          cdb.delete(`saas_${interaction.guild.id}`);
          return interaction.reply({ content: "❌ **Selam Alma (SA-AS) Sistemi Kapatıldı.**" });
        }
      }
    }
  ]
};
