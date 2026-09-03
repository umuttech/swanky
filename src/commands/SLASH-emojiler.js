const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['emojiler'],
  description: "Sunucudaki emojileri gösterir.",
  option: [],

  async execute(client, interaction) {

  
let animEmotes = [], staticEmotes = [];
interaction.guild.emojis.cache.forEach((x) => {
x.animated ? animEmotes.push(`<a:${x.name}:${x.id}>`) : staticEmotes.push(`<:${x.name}:${x.id}>`);
})
const embed = new MessageEmbed()
.setTimestamp()
.setColor('#000000')
.setTitle(`${interaction.guild.name} - Emoji Listesi`)
.setDescription(`_**Hareketli Emojiler**_\n${animEmotes}\n\n_**Hareketsiz Emojiler**_\n${staticEmotes}`)
interaction.reply({embeds: [embed]})
  }

};
