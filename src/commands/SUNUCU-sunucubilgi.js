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
      `**İsim:** \`${message.guild.name}\`\n`+
      `**:id: Sunucu ID:** \`${message.guild.id}\`\n`+
      `**Kurucu:** \`${client.users.cache.get(message.guild.ownerId).username}\`\n`+
      `**Konum:** \`${message.guild.preferredLocale}\`\n`+
      `**Boost Seviyesi:** \`${boostLevel[message.guild.premiumTier] || "0. Seviye"}\`\n`+
      `**Doğrulama Seviyesi:** \`${verificationLevels[message.guild.verificationLevel]}\`\n`+
      `**Oluşturulma Tarihi:** <t:${Math.floor(message.guild.createdTimestamp / 1000)}:F>\n`)

    .addField("İstatistik",
      `**Rol Sayısı:** \`${roles.length}\`\n`+
      `**Emoji Sayısı:** \`${emojis.size}\`\n`+
      `**Normal Emoji:** \`${emojis.filter(emoji => !emoji.animated).size}\`\n`+
      `**Hareketli Emoji:** \`${emojis.filter(emoji => emoji.animated).size}\`\n`+
      `**Yazı Kanalları:** \`${channels.filter(channel => channel.type === "GUILD_TEXT").size}\`\n`+
      `**Ses Kanalları:** \`${channels.filter(channel => channel.type === "GUILD_VOICE").size}\`\n`+
      `**Boost Sayısı:** \`${message.guild.premiumSubscriptionCount || "0"}\``)

    .addField("Kullanıcı",
      `**Toplam Üye:** \`${message.guild.memberCount}\`\n`+
      `**:people_holding_hands: İnsanlar:** \`${members.filter(member => !member.user.bot).size}\`\n`+
      `**Botlar:** \`${members.filter(member => member.user.bot).size}\`\n`)
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