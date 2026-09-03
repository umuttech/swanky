const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  slash: false,
  name: ['aboneyetkili-sıfırla'],
  description: "Abone yetkilisi rolünü sıfırlarsınız.",
  kategori: "Abone",
  
  async execute(client, message, args) {
    
     if (!message.member.permissions.has("ADMINISTRATOR"))return message.reply("Bu Komutu Kullanmak için `YÖNETİCİ` Yetkisine Sahip Olman Gerek!");
    
    db.delete(`aboneyetkili_${message.guild.id}`)
    message.reply({ content: `Abone Yetkilisi Rolü Başarıyla Sıfırlandı.` })
  }
}