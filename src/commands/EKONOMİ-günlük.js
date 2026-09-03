const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require('../base/settings.json')
const moment = require("moment")
moment.locale("tr")

module.exports = {
    slash: false,
    name: ['günlük'],
    description: "Günlük hediyenizi (SSCoin) alırsınız.",
    kategori: "Ekonomi",

  async execute(client, message, args) {


let kontrol = Number(db.fetch(`günlük_${message.author.id}`))
if(kontrol > moment.utc().format("X")){
message.reply(`Bir sonraki günlük ödülünü <t:${kontrol}:R> sonra alabilirsin.`)
}else {
    
let kontrol2 = Number(db.fetch(`coin_${message.author.id}`))
if(!kontrol2) db.set(`coin_${message.author.id}`, 0)

let günlük = ["55","75","105","125","145","165","185","200","225","245","265","285","300","325","345"]

let ödül = günlük[Math.floor(Math.random() * günlük.length)]

db.add(`coin_${message.author.id}`, Number(ödül))
db.set(`günlük_${message.author.id}`, moment.utc().add(1, 'day').format("X"))
message.reply(`Başarılı bir şekilde günlük hediyeni (**${ödül} SSCoin**) aldın.`)
}
}
}