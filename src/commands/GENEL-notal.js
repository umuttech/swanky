const { Discord } = require("discord.js")
const diskord = require("discord.js")
const debe = require("croxydb")
module.exports = {
   slash: false,
   name: ['notal'],
   description: "Belirttiğiniz notu bot kaydeder.",
   kategori: "Genel",
   
   async execute(client, message, args) {

let not = args.slice(0).join(" ")
if (!not) return message.reply("Lütfen bir not belirt!")

message.reply("<a:armors_onay1:990609433816092692> Notun Başarıyla Kayıt Edildi!")

debe.set(`not_${message.author.id}`, not)
}
}