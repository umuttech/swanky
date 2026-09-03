const Discord = require ("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
      slash: false,
      name: ['tag'],
      kategori: "Kayıt",
      description: "Sunucunuzda ayarladığınız tagı gösterir.",
      option: [],
  
 async execute(client, message, args) {
   
const tag = db.get(`tagg_${message.guild.id}`) || "Ayarlanmamış"

message.reply({ content: `\`${tag}\``})

 }
}