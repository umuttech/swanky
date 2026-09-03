const db = require("croxydb")
const Discord = require("discord.js")

module.exports = {
    slash: false,
    name: ['ototag-sıfırla'],
    description: "Ayarladığınız Oto Tagı sıfırlarsınız.",
    
async execute(client, message, args) {

if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("<a:armors_iptal:990609550153486357> Bu Komutu Kullanabilmek için `YÖNETİCİ` Yetkisine Sahip Olman Gerek!");

message.reply({ content: `<a:armors_onay1:990609433816092692> Oto Tag başarıyla sıfırlandı!
Tekrar ayarlamak için: \`d!ototag <tag>\`` })

db.delete(`ototagg_${message.guild.id}`)

}
}