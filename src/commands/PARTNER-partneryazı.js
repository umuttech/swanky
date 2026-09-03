const Discord = require("discord.js");
const db = require("croxydb")
module.exports = {
  slash: false,
  name: ['partner-yazı'],
  description: "Partner yazısı ayarlarsınız.",
  kategori: "Partner", 
 
   async execute(client, message, args) {
   const embed = new Discord.MessageEmbed()
   .setTitle("SwankyBot Partner Sistemi")
   .setDescription("Aşağıdaki butondan partner yazısını ayarlayabilirsin!")
const row = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
.setLabel("Yazı Ayarla!")
.setStyle("SECONDARY")
.setCustomId("partner_yazi"))
message.reply({embeds: [embed], components: [row]})
}
};