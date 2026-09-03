const Discord = require("discord.js");

module.exports = { 
  slash: true,
  name: ['renk-ara'],
  description: "Renk kodu ile renk ararsınız.",
  option: [
    {
      name: "renk",
      description: "Bir renk kodu gir. (Örn: ff0000)",
      type: 'string',
      require: true
    }
  ],
  
  
  async execute(client, interaction) {
  const renk = interaction.options.getString('renk')


  const storm = `https://singlecolorimage.com/get/${renk}/512x512.png`.replace(
    " ",
    "+"
  );

  const embed = new Discord.MessageEmbed()
    .setTitle("Aradığın Renk")
    .setColor("RANDOM")
    .setImage(storm)
    .setFooter({ text: renk });
  interaction.reply({ embeds: [embed] });
}
              };