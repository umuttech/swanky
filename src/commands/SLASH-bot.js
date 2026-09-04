const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ayarlar = require("../base/settings.json");

module.exports = {
  slash: true,
  name: ['bot'],
  description: 'Bot bağlantıları, davet linki ve yapımcı bilgileri.',
  subcommands: [
    {
      name: 'davet',
      description: 'Botun davet linkini ve destek sunucusunu gönderir.',
      async execute(client, interaction) {
        const embed = new MessageEmbed()
          .setTitle("🤖 SwankyBot Davet Linkleri")
          .setColor("#5865F2")
          .setDescription("SwankyBot'u kendi sunucunuza ekleyerek tüm özelliklerden ücretsiz yararlanabilirsiniz!")
          .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
          .setTimestamp();

        const row = new MessageActionRow().addComponents(
          new MessageButton().setLabel('Sunucuna Ekle').setStyle('LINK').setURL(ayarlar.botdavet || 'https://discord.com'),
          new MessageButton().setLabel('Destek Sunucusu').setStyle('LINK').setURL(ayarlar.desteksunucusu || 'https://discord.gg'),
          new MessageButton().setLabel('Oy Ver').setStyle('LINK').setURL(ayarlar.topgg || 'https://top.gg')
        );

        return interaction.reply({ embeds: [embed], components: [row] });
      }
    },
    {
      name: 'oyver',
      description: 'Botun Top.gg oy verme bağlantısını gönderir.',
      async execute(client, interaction) {
        const embed = new MessageEmbed()
          .setTitle("⭐ SwankyBot'a Oy Verin!")
          .setColor("GOLD")
          .setDescription("Bota oy vererek bize destek olabilir ve daha fazla sunucuya ulaşmamızı sağlayabilirsiniz!")
          .setFooter({ text: "Desteğiniz için teşekkürler!" });

        const row = new MessageActionRow().addComponents(
          new MessageButton().setLabel('Top.gg Üzerinden Oy Ver').setStyle('LINK').setURL(ayarlar.topgg || 'https://top.gg')
        );

        return interaction.reply({ embeds: [embed], components: [row] });
      }
    },
    {
      name: 'linkler',
      description: 'Botun tüm resmi bağlantılarını listeler.',
      async execute(client, interaction) {
        const embed = new MessageEmbed()
          .setTitle("🔗 SwankyBot Resmi Bağlantılar")
          .setColor("BLUE")
          .addField("Davet Et", `[Tıkla ve Ekle](${ayarlar.botdavet})`, true)
          .addField("Destek Sunucusu", `[Destek Al](${ayarlar.desteksunucusu})`, true)
          .addField("Oy Ver", `[Top.gg Oy](${ayarlar.topgg})`, true)
          .addField("Web Sitesi", `[Web Paneli](${ayarlar.website || 'https://swankybot-web123.glitch.me'})`, true);

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'yapimci',
      description: 'Botun geliştiricisi ve yapımcısı hakkında bilgi verir.',
      async execute(client, interaction) {
        const embed = new MessageEmbed()
          .setTitle("👑 SwankyBot Geliştiricisi")
          .setColor("DARK_GOLD")
          .setDescription("SwankyBot; gelişmiş moderasyon, ekonomi, kayıt ve eğlence komutlarıyla hizmet vermek üzere **⩛ Storm#6110** (<@606572330457497641>) tarafından geliştirilmiştir.")
          .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() });

        return interaction.reply({ embeds: [embed] });
      }
    }
  ]
};
