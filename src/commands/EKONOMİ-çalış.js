const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require('../base/settings.json')


module.exports = {
    slash: false,
    name: ['çalış'],
    description: "Çalışarak SScoin kazanırsınız.",
    kategori: "Ekonomi",
 async execute(client, message, args) {


const menu = new Discord.MessageEmbed()
.setDescription(`
**${ayarlar.prefix}çalış maden** Madende çalışırsın. 
**${ayarlar.prefix}çalış orman** Ormanda çalışırsın.`)

if(!args[0]) return message.reply({content: `**${ayarlar.prefix}çalış maden** Madende çalışırsın. 
**${ayarlar.prefix}çalış orman** Ormanda çalışırsın.` })


if(args[0] === "orman"){
    

let kontrol = db.fetch(`balta_${message.author.id}`)
if(!kontrol) return message.reply(`Çantanda balta bulunmamakta.`)

let miktarlar = [
    "2","2","2","2","3","3","3","3","4","4","4","4","5","5","5","5","6","6","6","6","7","7","7","7","8","8","8","8","9","9","9","9","10","10","10","10",
]

let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]

let kontrol2 = db.fetch(`odun_${message.author.id}`)
if(!kontrol2) db.set(`odun_${message.author.id}`, 0)
db.add(`odun_${message.author.id}`, Number(son))

let kontrol3 = db.fetch(`balta_hak_${message.author.id}`)
if(!kontrol3) db.set(`balta_hak_${message.author.id}`, 0)
db.add(`balta_hak_${message.author.id}`, 1)

if(db.fetch(`balta_hak_${message.author.id}`) >= 5){
    db.set(`balta_hak_${message.author.id}`, 0)
    db.add(`balta_${message.author.id}`, -1)
    message.reply(`Bir adet baltanın kullanım hakkı bitti.`)
}

message.reply(`Başarılı bir şekilde **${son} adet** Odun topladın.`)
}






if(args[0] === "maden"){


    let kontrol = db.fetch(`kazma_${message.author.id}`)
    if(!kontrol) return message.reply(`Çantanda kazma bulunmamakta.`)


let madentur = [
   "kömür","kömür","kömür","kömür","kömür","demir","demir","demir","demir","demir","altın","altın","altın","altın","altın","elmas","elmas","elmas","elmas","elmas","bor","bor","bor","bor","bor","bronz","bronz","bronz","bronz","bronz","gümüş","gümüş","gümüş","gümüş","gümüş"
]

let son = madentur[Math.floor(Math.random() * madentur.length)]


if(son === "kömür"){
    let miktarlar = [
        "2","2","2","2","3","3","3","3","4","4","4","4","5","5","5","5","6","6","6","6","7","7","7","7","8","8","8","8","9","9","9","9","10","10","10","10",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`kömür_${message.author.id}`)
    if(!kontrol) db.set(`kömür_${message.author.id}`, 0)
    db.add(`kömür_${message.author.id}`, Number(son))
    message.reply(`Başarılı bir şekilde maden yapıldı ve **${son} adet** Kömür çıkardın.`)



}else if(son === "demir"){
    let miktarlar = [
        "2","2","2","2","3","3","3","3","4","4","4","4","5","5","5","5","6","6","6","6","7","7","7","7","8","8","8","8","9","9","9","9","10","10","10","10",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`demir_${message.author.id}`)
    if(!kontrol) db.set(`demir_${message.author.id}`, 0)
    db.add(`demir_${message.author.id}`, Number(son))
    message.reply(`Başarılı bir şekilde maden yapıldı ve **${son} adet** Demir çıkardın.`)

}else if(son === "altın"){
    let miktarlar = [
        "2","2","2","2","3","3","3","3","4","4","4","4","5","5","5","5","6","6","6","6","7","7","7","7","8","8","8","8","9","9","9","9","10","10","10","10",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`altın_${message.author.id}`)
    if(!kontrol) db.set(`altın_${message.author.id}`, 0)
    db.add(`altın_${message.author.id}`, Number(son))
    message.reply(`Başarılı bir şekilde maden yapıldı ve **${son} adet** Altın çıkardın.`)

}else if (son === "elmas"){
    let miktarlar = [
        "2","2","2","2","3","3","3","3","4","4","4","4","5","5","5","5","6","6","6","6","7","7","7","7","8","8","8","8","9","9","9","9","10","10","10","10",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`elmas_${message.author.id}`)
    if(!kontrol) db.set(`elmas_${message.author.id}`, 0)
    db.add(`elmas_${message.author.id}`, Number(son))
    message.reply(`Başarılı bir şekilde maden yapıldı ve **${son} adet** Elmas çıkardın.`)

}else if (son === "bor"){
    let miktarlar = [
        "2","2","2","2","3","3","3","3","4","4","4","4","5","5","5","5","6","6","6","6","7","7","7","7","8","8","8","8","9","9","9","9","10","10","10","10",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`bor_${message.author.id}`)
    if(!kontrol) db.set(`bor_${message.author.id}`, 0)
    db.add(`bor_${message.author.id}`, Number(son))
    message.reply(`Başarılı bir şekilde maden yapıldı ve **${son} adet** Bor çıkardın.`)

}else if (son === "bronz"){
    let miktarlar = [
        "2","2","2","2","3","3","3","3","4","4","4","4","5","5","5","5","6","6","6","6","7","7","7","7","8","8","8","8","9","9","9","9","10","10","10","10",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`bronz_${message.author.id}`)
    if(!kontrol) db.set(`bronz_${message.author.id}`, 0)
    db.add(`bronz_${message.author.id}`, Number(son))
    message.reply(`Başarılı bir şekilde maden yapıldı ve **${son} adet** Bronz çıkardın.`)

}

let kontrol3 = db.fetch(`kazma_hak_${message.author.id}`)
if(!kontrol3) db.set(`kazma_hak_${message.author.id}`, 0)
db.add(`kazma_hak_${message.author.id}`, 1)

if(db.fetch(`kazma_hak_${message.author.id}`) >= 5){
    db.set(`kazma_hak_${message.author.id}`, 0)
    db.add(`kazma_${message.author.id}`, -1)
    message.reply(`Bir adet kazmanın kullanım hakkı bitti.`)
}
}
}
}