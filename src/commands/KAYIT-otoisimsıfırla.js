const Discord = require ("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
      slash: false,
      name: ['otoisimsıfırla'],
      kategori: "Kayıt",
      description: "Sunucunuzda oto ismi sıfırlarsınız.",
      option: [],
  
 async execute(client, message, args) {

    db.set(`otoisimm_${message.guild.id}`)

message.reply({ content: `Otomatik İsim başarıyla sıfırlandı.`})

 }
}