const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['sunucubilgi'],
    description: "Sunucunun bilgilerini gösterir.",
    kategori: "Sunucu",
    async execute(client, message, args) {

        const verificationLevels = {
    NONE: "Çok Düşük",
    LOW: "Normal",
    MEDIUM: "Yüksek",
    HIGH: "Çok Çok",
    VERY_HIGH: "Aşrı Yüksek"
  };

  const boostLevel = {
    TIER_1: "1. Seviye",
    TIER_2: "2. Seviye",
    TIER_3: "3. Seviye",
  }


  const roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString());
  const members = message.guild.members.cache
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;

  const embed = new Discord.MessageEmbed()
    .setAuthor({name: `Sunucu Bilgisi - ${message.guild.name}`})
    .setColor("#7e7e7e")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField("Genel Bilgiler", 
      `**<a:armors_saok:1022562532826824825> İsim:** \`${message.guild.name}\`\n`+
      `**:id: Sunucu ID:** \`${message.guild.id}\`\n`+
      `**<a:armors_tacc:1014221717356412938> Kurucu:** \`${client.users.cache.get(message.guild.ownerId).username}\`\n`+
      `**<:armors_location:1022561533265465395> Konum:** \`${message.guild.preferredLocale}\`\n`+
      `**<a:armors_booster:998291236228186222> Boost Seviyesi:** \`${boostLevel[message.guild.premiumTier] || "0. Seviye"}\`\n`+
      `**<:armors_guard:1009870782870065152> Doğrulama Seviyesi:** \`${verificationLevels[message.guild.verificationLevel]}\`\n`+
      `**<a:armors_saat:994660462140604416> Oluşturulma Tarihi:** <t:${Math.floor(message.guild.createdTimestamp / 1000)}:F>\n`)

    .addField("İstatistik",
      `**<a:armors_saok:1022562532826824825> Rol Sayısı:** \`${roles.length}\`\n`+
      `**<a:armors_saok:1022562532826824825> Emoji Sayısı:** \`${emojis.size}\`\n`+
      `**<a:armors_saok:1022562532826824825> Normal Emoji:** \`${emojis.filter(emoji => !emoji.animated).size}\`\n`+
      `**<a:armors_saok:1022562532826824825> Hareketli Emoji:** \`${emojis.filter(emoji => emoji.animated).size}\`\n`+
      `**<:armors_message:1011737452836307005> Yazı Kanalları:** \`${channels.filter(channel => channel.type === "GUILD_TEXT").size}\`\n`+
      `**<:armors_voice:1022562872368308235> Ses Kanalları:** \`${channels.filter(channel => channel.type === "GUILD_VOICE").size}\`\n`+
      `**<a:armors_booster:998291236228186222> Boost Sayısı:** \`${message.guild.premiumSubscriptionCount || "0"}\``)

    .addField("Kullanıcı",
      `**<:armors_users:1022558807651532830> Toplam Üye:** \`${message.guild.memberCount}\`\n`+
      `**:people_holding_hands: İnsanlar:** \`${members.filter(member => !member.user.bot).size}\`\n`+
      `**<:armors_bot:990228584666902539> Botlar:** \`${members.filter(member => member.user.bot).size}\`\n`)
    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL()})
    .setTimestamp();
  if (message.guild.description)
    embed.setDescription("**Sunucu Açıklaması:** "+ message.guild.description);
  
  
  const button = new Discord.MessageButton().setLabel('Sunucu Resmi URL').setStyle('LINK').setURL(`${message.guild.iconURL({ dynamic: true })}`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })

    }
}