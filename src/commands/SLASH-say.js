const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['say'],
  description: 'Sunucudaki toplam üye, ses kanallarındaki üye ve boost sayılarını gösterir.',
  async execute(client, interaction) {
    const guild = interaction.guild;
    const boost = guild.premiumSubscriptionCount || 0;
    const seste = guild.members.cache.filter(m => m.voice?.channel).size;

    const embed = new MessageEmbed()
      .setTitle(`📊 ${guild.name} • Sunucu İstatistikleri`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor("#5865F2")
      .addField("👥 Toplam Üye", `**${guild.memberCount}**`, true)
      .addField("🔊 Ses Kanallarında", `**${seste}** üye`, true)
      .addField("🚀 Boost Sayısı", `**${boost}** boost`, true)
      .setFooter({ text: `Sorgulayan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  }
};
