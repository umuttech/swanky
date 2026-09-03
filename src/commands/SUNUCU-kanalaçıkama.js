const { Discord } = require("discord.js");

module.exports = {
    slash: false,
    name: ['kanalaçıklama'],
    description: "Komutu kullandığınız kanalın açıklamasını belirttiğiniz şekilde değiştirir.",
    kategori: "Sunucu",
 
async execute(client, message, args) {

let aciklama = args.slice(0).join(" ")

if (!aciklama) return message.reply("Lütfen kanal açıklamasını yaz!")

let kanal = message.channel

client.channels.cache.get(message.channel.id).setTopic(aciklama)

message.reply("Kanal açıklaması başarıyla değiştirildi!")


}
}