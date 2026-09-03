const Discord = require("discord.js");
const db = require("nrc.db")


module.exports = {
    slash: false,
    name: ['gönder'],
    description: "Belirttiğiniz kişiye belirttiğiniz miktarda SSCoin gönderirsiniz.",
    kategori: "Ekonomi",
     async execute(client, message, args) {


let coin = db.fetch(`coin_${message.author.id}`)
let miktar = args[1]

let user = message.mentions.users.first();

if(!user) return message.reply(`Lütfen SSCoin göndereceğiniz kişiyi belirtin.`)
if(message.author.id === user.id) return message.reply(`Kendine SSCoin gönderemezsin.`)
if(user.bot === true) return message.reply(`Bir Bota SSCoin gönderemezsin.`)
if(!miktar) return message.reply(`Lütfen gönderilecek miktarı belirt.`)
if(isNaN(miktar)) return message.reply(`Gönderilecek miktar sadece **sayı** olmalıdır.`)
if(coin < miktar) return message.reply(`Gönderilecek miktar cüzdanınızda bulunmamakta.`)

db.add(`coin_${message.author.id}`, -Number(miktar))
let kontrol = db.fetch(`coin_${user.id}`)
if(!kontrol) db.set(`coin_${user.id}`,0)
db.add(`coin_${user.id}`, Number(miktar))
message.reply(`Başarılı bir şekilde \`${user.tag}\` adlı kişiye **${miktar}** SSCoin göndderdin.`)


}
}