const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['token'],
  description: 'Botun gizli tokenini görüntülersiniz (şaka komutu).',
  async execute(client, interaction) {
    const embed = new MessageEmbed()
      .setAuthor({ name: `${interaction.user.username}, al sana tokenim!` })
      .setImage("https://c.tenor.com/lC0BLIM9TOIAAAAC/recep-ivedik-nah.gif")
      .setColor("RED")
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  }
};
