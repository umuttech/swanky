const { MessageEmbed } = require("discord.js");
const database = require("croxydb");

module.exports = {
  slash: true,
  name: ['botlist'],
  description: 'Gelişmiş BotList sistemi.',
  subcommands: [
    {
      name: 'kur',
      description: 'BotList sistemini kurarsınız.',
      options: [
        { name: 'botlist-log', description: 'Botlist log kanalı', type: 'channel', require: true },
        { name: 'bot-rolu', description: 'Onaylanan botlara verilecek rol', type: 'role', require: true },
        { name: 'developer-rolu', description: 'Botunu ekleyen geliştiricilere verilecek rol', type: 'role', require: true },
        { name: 'yetkili-rolu', description: 'Botları onaylayacak/reddedecek yetkili rolü', type: 'role', require: true },
        { name: 'onay-kanali', description: 'Yetkililerin onay butonlarını göreceği kanal', type: 'channel', require: true },
        { name: 'botekle-kanali', description: 'Kullanıcıların bot ekleme komutunu kullanacağı kanal', type: 'channel', require: true },
        { name: 'ayrildi-log', description: 'Geliştirici sunucudan çıkınca bildirim gidecek log kanalı', type: 'channel', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const log = interaction.options.getChannel("botlist-log");
        const botRol = interaction.options.getRole("bot-rolu");
        const devRol = interaction.options.getRole("developer-rolu");
        const adminRol = interaction.options.getRole("yetkili-rolu");
        const onay = interaction.options.getChannel("onay-kanali");
        const botekle = interaction.options.getChannel("botekle-kanali");
        const ayrildiLog = interaction.options.getChannel("ayrildi-log");

        const gid = interaction.guild.id;
        database.set(`log_${gid}`, log.id);
        database.set(`botRol_${gid}`, botRol.id);
        database.set(`devRol_${gid}`, devRol.id);
        database.set(`adminRol_${gid}`, adminRol.id);
        database.set(`onay_${gid}`, onay.id);
        database.set(`botekle_${gid}`, botekle.id);
        database.set(`ayrildiLog_${gid}`, ayrildiLog.id);

        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("✅ BotList Sistemi Başarıyla Kuruldu!")
          .setDescription("BotList ayarları başarıyla kaydedildi.")
          .addField("Botlist Log", `<#${log.id}>`, true)
          .addField("Onay Kanalı", `<#${onay.id}>`, true)
          .addField("Bot Ekle Kanalı", `<#${botekle.id}>`, true)
          .addField("Bot Rolü", `<@&${botRol.id}>`, true)
          .addField("Geliştirici Rolü", `<@&${devRol.id}>`, true)
          .addField("Yetkili Rolü", `<@&${adminRol.id}>`, true)
          .setFooter({ text: "Sıfırlamak için: /botlist kapat" });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'kapat',
      description: 'BotList sistemini tamamen kapatır ve ayarları sıfırlar.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const gid = interaction.guild.id;
        database.delete(`log_${gid}`);
        database.delete(`botRol_${gid}`);
        database.delete(`devRol_${gid}`);
        database.delete(`adminRol_${gid}`);
        database.delete(`onay_${gid}`);
        database.delete(`botekle_${gid}`);
        database.delete(`ayrildiLog_${gid}`);

        return interaction.reply({ content: "🗑️ BotList Sistemi başarıyla sıfırlandı." });
      }
    }
  ]
};
