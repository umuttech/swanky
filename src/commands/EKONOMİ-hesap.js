const Discord = require("discord.js");
const ayarlar = require('../base/settings.json')
const moment = require("moment")
moment.locale("tr")
const db = require("nrc.db")
module.exports = {
    slash: false,
    name: ['hesap'],
    description: "Banka hesabı açar/kapatırsınız.",
    kategori: "Ekonomi",
    async execute(client, message, args) {

if(!args[0]) return message.reply({content: `
**${ayarlar.prefix}hesap aç** Hesap kurarsın.
**${ayarlar.prefix}hesap sil** Hesabını kapatırsın.
`})

if(args[0] === "aç"){
let isim = args[1]

if(!isim) return message.reply(`Lütfen hesap adı belirt.`)

db.set(`hesap_${message.author.id}`, { name: isim })
db.set(`coin_${message.author.id}`, 0)
message.reply(`Hesabınız başarıyla **${isim}** ismi ile açılmıştır.`)
}


if(args[0] === "kapat"){

let kontrol = db.fetch(`hesap_${message.author.id}`)

if(!kontrol) return message.reply(`Zaten bir hesabın yok.`)
db.delete(`hesap_${message.author.id}`)
let kontrol2 = db.fetch(`coin_${message.author.id}`)

if(kontrol2) db.delete(`coin_${message.author.id}`)

message.reply(`Hesabın başarılı bir şekilde kapatıldı.`)
}



}
}