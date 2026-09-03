const { Discord } = require("discord.js")
const diskord = require("discord.js")
const debe = require("croxydb")
module.exports = {
   slash: false,
   name: ['notsıfırla'],
   description: "Notunuzu sıfırlarsınız.",
   kategori: "Genel",
   
   async execute(client, message, args) {
message.reply("Notun Başarıyla Sıfırlandı!")

debe.delete(`not_${message.author.id}`)
}
}