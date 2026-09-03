const Discord = require("discord.js");
const db = require("nrc.db")


module.exports = {
    slash: false,
    name: ['çanta'],
    description: "Çantanızdaki öğeleri görürsünüz.",
    kategori: "Ekonomi",
    async execute(client, message, args) {

let kazma = db.fetch(`kazma_${message.author.id}`)
let balta = db.fetch(`balta_${message.author.id}`)
let elmas = db.fetch(`elmas_${message.author.id}`)
let altın = db.fetch(`altın_${message.author.id}`)
let demir = db.fetch(`demir_${message.author.id}`)
let kömür = db.fetch(`kömür_${message.author.id}`)
let bor = db.fetch(`bor_${message.author.id}`)
let bronz = db.fetch(`bronz_${message.author.id}`)
let gümüş = db.fetch(`gümüş_${message.author.id}`)
let odun = db.fetch(`odun_${message.author.id}`)
let sscoın = db.fetch(`coin_${message.author.id}`)

const embed = new Discord.MessageEmbed()
.setTitle(message.author.username + ", işte çantan!")
.setThumbnail(message.author.displayAvatarURL())
.setDescription(`Cüzdanındaki **SSCoin** miktarı: **${sscoın}**`)
.addField(`Maden Ürünleri`, 
`Kazma: **${kazma? kazma: 0}**   Altın: **${altın ? altın: 0}**
Balta: **${balta ? balta: 0}**   Gümüş: **${gümüş ? gümüş: 0}**
Elmas: **${elmas ? elmas: 0}**   Demir: **${demir ? demir: 0}**
Kömür: **${kömür ? kömür: 0}**   Bor: **${bor ? bor : 0}**
Bronz: **${bronz ? bronz: 0}**`,true)
.addField(`Orman Ürünleri`,
`Odun: **${odun ? odun: 0}** `)
.setFooter(client.user.username + ` Ekonomi Sistemi - Çanta`, client.user.avatarURL())
.setTimestamp()

message.reply({embeds:[embed]})
}
}