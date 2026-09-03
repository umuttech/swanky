const Discord = require("discord.js");
const db = require("croxydb")
module.exports = {
 slash: false,
 name: ['partner-ol'],
 description: "ID'si girlen sunucuya partnerlik isteği gönderirsiniz.",
 kategori: "Partner",

 async execute(client, message, args) {
let kanal = db.fetch(`partnerkanal_${message.guild.id}`)
if (!kanal) return message.reply("Partner Kanalı Ayarlanmamış!")
let log = db.fetch(`partnerlog_${message.guild.id}`)
if (!log) return message.reply("Log ayarlanmamış!")
let text = db.fetch(`partnertext_${message.guild.id}`)
if (!text) return message.reply("Partner Yazısı Ayarlanmamış!")
let gidenurl = args[0]
if (!gidenurl) return message.reply("Lütfen bir sunucu ID gir!")
let text2 = db.fetch(`partnertext_${gidenurl}`)
if (!text2) return message.reply("Belirtilen sunucunun yazısı ayarlanmamış!")
let log2 = db.fetch(`partnerlog_${gidenurl}`)
if (!log2) return message.reply("Belirtilen sunucunun logu ayarlanmamış!")
let kanal2 = db.fetch(`partnerkanal_${gidenurl}`)
if (!kanal2) return message.reply("Belirtilen sunucunun partner kanalı ayarlanmamış!")

const embed = new Discord.MessageEmbed()
.setTitle("Bir Partner İsteği Geldi!")
.setDescription(`Partnerlik İsteği Gönderen Sunucu: **${message.guild.name}** \`(${message.guild.id})\`\nPartnerlik İsteği Gönderen Kişi: ${message.author}`)
const row = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
.setLabel("Evet")
.setStyle("SUCCESS")
.setCustomId("evet"),
new Discord.MessageButton()
.setLabel("Hayır")
.setStyle("DANGER")
.setCustomId("hayır")
)
client.channels.cache.get(log2).send({embeds: [embed], components: [row]})
message.reply("Başarıyla partnerlik isteği gönderildi.")
db.set(`partnerlikbekleniyor_${gidenurl}`, message.guild.id)
}
};