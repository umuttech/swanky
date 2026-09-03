const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  slash: false,
  name: ['aboneyetkili'],
  description: "Abone yetkilisi rolü ayarlarsınız.",
  kategori: "Abone",
  
  async execute(client, message, args) {
    
     if (!message.member.permissions.has("ADMINISTRATOR"))return message.reply("<a:armors_iptal:990609550153486357> Bu Komutu Kullanmak için `YÖNETİCİ` Yetkisine Sahip Olman Gerek!");
    
    let rol = message.mentions.roles.first()
    
    if (!rol) return message.reply(`Bir Rol Belirt!`)
    
    const yetkilirolembed = new Discord.MessageEmbed()
    .setDescription(`Abone Yetkilisi Rolü Başarıyla <@&${rol.id}> Olarak Ayarlandı.`)
    .setColor("GREEN")
    
    db.set(`aboneyetkili_${message.guild.id}`, rol.id)
    message.channel.send({ embeds: [yetkilirolembed]})
  }
}