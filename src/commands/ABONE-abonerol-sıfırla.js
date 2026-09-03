const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  slash: false,
  name: ['abonerol-sıfırla'],
  description: "Abone rolü sıfırlarsınız.",
  kategori: "Abone",
  
  async execute(client, message, args) {
    
     if (!message.member.permissions.has("ADMINISTRATOR"))return message.reply("Bu Komutu Kullanmak için `YÖNETİCİ` Yetkisine Sahip Olman Gerek!");
    
    db.delete(`abonerol_${message.guild.id}`)
    message.channel.send({ content: `Abone Rolü Başarıyla Sıfırlandı.` })
  }
}