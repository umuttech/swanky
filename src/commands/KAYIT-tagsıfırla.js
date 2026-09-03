const Discord = require ("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
      slash: false,
      name: ['tagsıfırla'],
      kategori: "Kayıt",
      description: "Sunucunuzda tagı sıfırlarsınız.",
      option: [],
  
 async execute(client, message, args) {

    db.delete(`tagg_${message.guild.id}`)

message.reply({ content: `Tag başarıyla sıfırlandı.`})

 }
}