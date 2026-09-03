const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  slash: false,
  name: ['aboneyetkili-ver'],
  description: "Belirttiğiniz kullanıcıya abone yetkilisi rolü verirsiniz.",
  kategori: "Abone",
  
  async execute(client, message, args) {
    
     if (!message.member.permissions.has("ADMINISTRATOR"))return message.reply("<a:armors_iptal:990609550153486357> Bu Komutu Kullanmak için `YÖNETİCİ` Yetkisine Sahip Olman Gerek!");
    
    let member = message.mentions.members.first()
    let rol = db.fetch(`aboneyetkili_${message.guild.id}`)
    
    if (!member) return message.reply(`Bir Kullanıcı Belirt!`)
    if(member.roles.cache.get(rol)) return message.channel.send("Bu Kullanıcıda Zaten Abone Yetkilisi Rolü Var!")
    
    member.roles.add(rol)
    
    const yetkiverembed = new Discord.MessageEmbed()
    .setDescription(`<@${member.id}> Adlı Kullanıcıya <@&${rol}> Rolü Başarıyla Verildi.`)
    .setColor("GREEN")

    message.channel.send({ embeds: [yetkiverembed]})
  }
}