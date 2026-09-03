const Discord = require("discord.js")
const db = require("croxydb")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['hgbb'],
    description: "Hoş geldin - bye bye kanalı ayarlarsınız.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply("YETERSİZ YETKİ! Gerekli yetki: `Sunucuyu Yönet`")

  

if(!args[0]) return message.reply({ content: `<a:armors_iptal:990609550153486357> **Hatalı Kullanım!**
Ayarlamak İçin: \`s!hgbb aç #kanal\`
Sıfırlamak İçin: \`s!hgbb kapat\`` })
  let kanal = message.mentions.channels.first()

  if(args[0] == 'aç') {
  db.set(`cshgbb.${message.guild.id}`, kanal.id)
if(!kanal) return message.reply("**Bir Kanal Belirtmedin!**")
    
 message.reply({ content: `**<a:armors_onay1:990609433816092692> Hoş Geldin - ByeBye Kanalı Başarıyla <#${kanal.id}> Olarak Ayarlandı!**`})
    
  }

  if(args[0] == 'kapat') {
  db.delete(`cshgbb.${message.guild.id}`)
    
     
  message.reply({ content: `**Hoş Geldin Bye Bye Sistemi kapatıldı!**`})
 
  }

    }
}