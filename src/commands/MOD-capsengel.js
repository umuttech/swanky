const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../base/settings.json")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['capsengel'],
    description: "Caps Lock engel sistemi açar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {
      
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`❌ Bu Komutu Kullana Bilmek İçin \`Mesajları Yönet\` Yetkisine Sahip Olmalısın!`)
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if(args[0] === 'aç') {
    db.set(`capslock_${message.guild.id}`, true)
    message.reply(`:white_check_mark: │ **Capslock Engel Sistemi Aktif!**`)
  return
}
if (args[0] === 'kapat') {
  db.delete(`capslock_${message.guild.id}`)
message.reply(`:x: │ **Capslock Engel Sistemi Deaktif!**`)
return
}

    }
}