const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['oylama'],
  description: 'Sunucuda evet/hayır oylaması başlatır.',
  option: [
    {
      name: 'soru',
      description: 'Oylanacak konu veya soru',
      type: 'string',
      require: true
    }
  ],
  async execute(client, interaction) {
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply({ content: "Bu komutu kullanabilmek için `MESAJLARI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
    }

    const question = interaction.options.getString('soru');

    const embed = new MessageEmbed()
      .setTitle("📊 Oylama Başladı!")
      .setColor("ORANGE")
      .setDescription(`\n**${question}**\n\n> Oy kullanmak için aşağıdaki tepkilere basabilirsiniz.`)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setFooter({ text: `Oylamayı Başlatan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ content: "✅ Oylama başlatıldı!", ephemeral: true });
    const msg = await interaction.channel.send({ embeds: [embed] });
    await msg.react('👍');
    await msg.react('👎');
  }
};
