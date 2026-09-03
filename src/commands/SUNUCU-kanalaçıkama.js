const { Discord } = require("discord.js");

module.exports = {
    slash: false,
    name: ['kanalaçıklama'],
    description: "Komutu kullandığınız kanalın açıklamasını belirttiğiniz şekilde değiştirir.",
    kategori: "Sunucu",
 
async execute(client, message, args) {

let aciklama = args.slice(0).join(" ")

if (!aciklama) return message.reply("<a:armors_iptal:990609550153486357> Lütfen kanal açıklamasını yaz!")

let kanal = message.channel

client.channels.cache.get(message.channel.id).setTopic(aciklama)

message.reply("a:armors_onay1:990609433816092692> Kanal açıklaması başarıyla değiştirildi!")


}
}