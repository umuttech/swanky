const Discord = require("discord.js");
const db = require("croxydb")
module.exports = { 
 slash: false,
 name: ['partner-log'],
 descriotion: "Partner log kanalı kurarsınız.",
 kategori: "Partner",

  async execute(client, message, args) {
let kanal = message.mentions.channels.first()
if (!kanal) return message.reply("Lütfen bir log kanalı etiketle!")
message.reply(`Başarıyla Partner Log Kanalı ${kanal} Olarak Ayarlandı!`)
db.set(`partnerlog_${message.guild.id}`, kanal.id)
}
};