const Discord = require("discord.js");
const ayarlar = require('../base/settings.json')
const moment = require("moment")
moment.locale("tr")
const db = require("nrc.db")
module.exports = {
    slash: false,
    name: ['banka'],
    description: "Bankanızı görüntülersiniz.",
    kategori: "Ekonomi",

     async execute(client, message, args) {
let tekrar = db.fetch("vadeli_hesaplar")
if(!tekrar) db.set("vadeli_hesaplar", [])

let banka = db.fetch(`banka_${message.author.id}`)
let bankacoin = db.fetch(`banka_coin_${message.author.id}`)
let coin = db.fetch(`coin_${message.author.id}`)
let bankavadeli = db.fetch(`banka_coin_vadeli_${message.author.id}`)
let hesap = db.fetch(`hesap_${message.author.id}`)
let durum;
if(banka) durum = `Aktif / Hesap İsmi: ${hesap.name}`

const menu = new Discord.MessageEmbed()
.setThumbnail(message.author.displayAvatarURL())
.addField(`Banka Durumu`,`
Durum: **${durum ? durum : "Kapalı"}**
Bankadaki SSCoin: **${bankacoin ? bankacoin : "0"}**
Vadeli Hesabındaki SSCoin: **${bankavadeli ? bankavadeli : "0"}**
Cüzdanındaki SSCoin: **${coin ? coin : "0"}**`,false)

.addField(`Diğer Komutlar`,`
**${ayarlar.prefix}banka kur** Banka hesabı Kurmanızı sağlar.
**${ayarlar.prefix}banka kapat** Banka hesabını kapatmanıza yarar.
**${ayarlar.prefix}banka vade** Vadeli hesabınızla ilgili işlemler yaparsınız.
**${ayarlar.prefix}banka çek** Banka hesabından SSCoin çekmenizi sağlar.
**${ayarlar.prefix}banka yatır** Banka hesabına SScoin yatırmanızı sağlar.`,false)
.setFooter(client.user.username + ` Ekonomi Sistemi - Banka`, client.user.avatarURL())
.setTimestamp()

if(!args[0]) return message.reply({embeds: [menu]})


if(args[0] === "kur"){
let kontrol = db.fetch(`hesap_${message.author.id}`)
if(!kontrol) return message.reply(`Lütfen hesabını oluştur. (${ayarlar.prefix}hesap aç)`)
if(banka) return message.reply(`Şu anda zaten açık bir banka hesabınız bulunmakta.`)
if(Number(coin) < 120) return message.reply(`Banka hesabı oluşturmak için **120 SSCoin** 'e ihtiyacın var.`)
db.set(`banka_${message.author.id}`, true)
db.set(`banka_coin_${message.author.id}`, 0)
/// db.set(`banka_kurulum_${message.author.id}`, moment.utc().format("MMDDHHmm"))
db.add(`coin_${message.author.id}`, -120)
message.reply(`Hesabınız başarılı bir şekilde kurulmuştur.`)
}

if(args[0] === "kapat"){
if(!banka) return message.reply(`Şu anda zaten bir banka hesabınız bulunmamakta.`)
db.delete(`banka_${message.author.id}`)
db.delete(`banka_coin_${message.author.id}`)
message.reply(`Hesabınız başarılı bir şekilde kapatılmıştır.`)
}

if(args[0] === "yatır"){
let kontrol = db.fetch(`hesap_${message.author.id}`)
if(!kontrol) return message.reply(`Lütfen hesabını oluştur. (${ayarlar.prefix}hesap aç)`)
if(!banka) return message.reply(`Şu anda bir banka hesabınız bulunmamakta.`)

let miktar = args[1]

if(!miktar) return message.reply(`Lütfen banka hesabına yatırılacak SSCoin miktarını belirt.`)
if(isNaN(miktar)) return message.reply(`Yatırılacak miktar sadece **sayı** olmalıdır.`)
if(coin < miktar) return message.reply(`Cüzdanında yeterli SSCoin bulunmamakta.`)
db.add(`banka_coin_${message.author.id}`, Number(miktar))
db.add(`coin_${message.author.id}`, -Number(miktar))
message.reply(`Banka hesabına başarılı bir şekilde **${miktar}** SSCoin yatırdın.`)
}
if(args[0] === "çek"){
let kontrol = db.fetch(`hesap_${message.author.id}`)
if(!kontrol) return message.reply(`Lütfen hesabını oluştur. (${ayarlar.prefix}hesap aç)`)
if(!banka) return message.reply(`Şu anda bir banka hesabınız bulunmamakta.`)

let miktar = args[1]

if(!miktar) return message.reply(`Lütfen bankadan çekilecek SSCoin miktarını belirt.`)
if(isNaN(miktar)) return message.reply(`Çekilecek miktar sadece **sayı** olmalıdır.`)
if(bankacoin < miktar) return message.reply(`Banka hesabında yeterli SSCoin bulunmamakta.`)
db.add(`banka_coin_${message.author.id}`, -Number(miktar))
db.add(`coin_${message.author.id}`, Number(miktar))
message.reply(`Banka hesabından başarılı bir şekilde **${miktar}** SSCoin çektin.`)
}

if(args[0] === "vade"){
let kontrol = db.fetch(`hesap_${message.author.id}`)
if(!kontrol) return message.reply(`Lütfen hesabını oluştur. (${ayarlar.prefix}hesap aç)`)
if(!args[1]) return message.reply(`**${ayarlar.prefix}banka vade aç** Vadeli hesap açarsınız.
**${ayarlar.prefix}banka vade kapat** Vadeli hesabınızı kapatırsınız.
**${ayarlar.prefix}banka vade çek** Vadeli hesabınızdan SSCoin çekersiniz.
**${ayarlar.prefix}banka vade yatır** Vadeli hesabınıza SSCoin yatırırsınız.`) 


if(args[1] === "aç"){
let kontrol = db.fetch(`vadeli_hesap_${message.author.id}`)
if(kontrol) return message.reply(`Şu anda zaten açık bir vadeli hesabın bulunmakta.`)
db.set(`vadeli_hesap_${message.author.id}`, true)
db.push(`vadeli_hesaplar`, message.author.id)
message.reply(`Vadeli hesabın başarılı bir şekilde açıldı.`)

}
if(args[1] === "kapat"){
let kontrol = db.fetch(`vadeli_hesap_${message.author.id}`)
if(!kontrol) return message.reply(`Şu anda zaten bir vadeli hesabın bulunmamakta.`)
db.delete(`vadeli_hesap_${message.author.id}`)
let miktar = db.fetch(`banka_coin_vadeli_${message.author.id}`)
db.add(`banka_coin_${message.author.id}`, Number(miktar))
db.arrayDeleteVal(`vadeli_hesaplar`, message.author.id)
db.delete(`banka_coin_vadeli_${message.author.id}`)
message.reply(`Vadeli hesabın başarılı bir şekilde kapatıldı. Vadeli hesabındaki SSCoin 'ler hesabına aktarıldı.`)
}


if(args[1] === "yatır"){
let kontroll = db.fetch(`vadeli_hesap_${message.author.id}`)
if(!kontroll) return message.reply(`Lütfen vadeli hesabını oluştur. (${ayarlar.prefix}banka vade aç)`)
let miktar = args[2] 
if(!miktar) return message.reply(`Yatırılacak SSCoin miktarını belirt.`)
if(isNaN(miktar)) return message.reply(`Yatırılacak miktar sadece **sayı** olmalıdır.`)
let banka = db.fetch(`banka_coin_${message.author.id}`)
let coin = Number(miktar)
if(coin > banka) return message.reply(`Banka hesabında yeterli SSCoin bılunmamakta.`)
let kontrol = db.fetch(`banka_coin_vadeli_${message.author.id}`)
if(!kontrol) db.set(`banka_coin_vadeli_${message.author.id}`, 0)
db.add(`banka_coin_vadeli_${message.author.id}`, coin)
db.add(`banka_coin_${message.author.id}`, -coin)

message.reply(`Vadeli hesabına başarılı bir şeikilde **${miktar}** SSCoin yatırdın.`)
}
if(args[1] === "çek"){
let kontroll = db.fetch(`vadeli_hesap_${message.author.id}`)
if(!kontroll) return message.reply(`Lütfen vadeli hesabını oluştur. (${ayarlar.prefix}banka vade aç)`)
let miktar = args[2] 
if(!miktar) return message.reply(`Çekilecek SSCoin miktarını belirt.`)
if(isNaN(miktar)) return message.reply(`Çekilecek miktar sadece **sayı** olmalıdır.`)
let banka = db.fetch(`banka_coin_vadeli_${message.author.id}`)
let coin = Number(miktar)
if(coin > banka) return message.reply(`Vadeli hesabında yeterli SSCoin bulunmamakta.`)
let kontrol = db.fetch(`banka_coin_vadeli_${message.author.id}`)
if(!kontrol) db.set(`banka_coin_vadeli_${message.author.id}`, 0)
db.add(`banka_coin_vadeli_${message.author.id}`, -coin)
db.add(`banka_coin_${message.author.id}`, coin)
message.reply(`Banka hesabına başarılı bir şekilde **${miktar}** SSCoin yatırdın.`)
    
    
}

}

    }
}