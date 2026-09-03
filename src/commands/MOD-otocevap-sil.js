const ms = require('ms');
const db = require('croxydb');
const Discord = require('discord.js');


module.exports = {
     slash: false,
     name: ['otocevap-sil'],
     description: "Belirttiğiniz Oto Cevabı siler.",
     kategori: "Moderasyon",

     async execute(client, message, args, tools) {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`);
  
  const msg = args.slice(0).join(" ")
  if(!msg) return message.reply({ content: `Lütfen silinmesini istediğin Oto Cevabı yaz!
**Örnek:** \`s!otocevap-sil <mesaj>\`` })
  
  const cmd = msg.split(" ")[0]
  
  const data = db.fetch(`otocevapp_${cmd}_${message.guild.id}`)
  if(!data) return message.channel.send("> Böyle oto cevap bulunmuyor.")

  message.channel.send({ content: `${cmd} otocevabı başarıyla silindi!
Yeniden ayarlmak için: \`d!otocevap <mesaj>:<cevap>\`` })
  db.delete(`otocevapp_${cmd}_${message.guild.id}`)
  
  
}
}