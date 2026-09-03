const Discord = require ("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
      slash: false,
      name: ['tagayarla'],
      kategori: "Kayıt",
      description: "Sunucunuzda tag ayarlarsınız.",
      option: [],
  
 async execute(client, message, args) {

    const tag = args.slice(0).join(' ');

    db.set(`tagg_${message.guild.id}`, tag)

message.reply({ content: `Tag başarıyla \`${tag}\` olarak ayarlandı.`})

 }
}