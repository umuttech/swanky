const ms = require('ms');
const db = require('croxydb');
const Discord = require('discord.js');


module.exports = {
     slash: false,
     name: ['otocevap'],
     description: "Belirttiğiniz yazıyı birisi yazarsa bot belirttiğiniz cevabı verir.",
     kategori: "Moderasyon",

     async execute(client, message, args, tools) {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`<a:armors_iptal:990609550153486357> Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`);
  
  const msg = args.slice(0).join(" ")
  if(!msg) return message.reply({ content: `<a:armors_iptal:990609550153486357> Lütfen bir mesaj ve bir cevap yaz!
**Örnek:** \`s!otocevap selam:selam, hoş geldin.\`
<a:armors_unlem:1010142831748329562> **Uyarı:** \`d!otocevap merhaba:merhaba\` gibi bir otocevap ayarlarsanız bot kendine de cevap vereceği için siz o otocevabı kapatana kadar döngüye girer. Bunu yapmanız önerilmez!.` })
  
  const cmd = msg.split(":")[0]
  const cmdAnswer = msg.split(":")[1]
  
  const data = db.fetch(`otocevapp_${cmd}_${message.guild.id}`)
  if(data) return message.channel.send("> <a:armors_iptal:990609550153486357> Böyle komut zaten bulunuyor.")
  
  
  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("Oto Cevap Başaırlya Kaydedildi!")
  .setDescription(`<a:armors_onay3:1010226775286100049> Artık \`${cmd}\` yazıldığında \`${cmdAnswer}\` diye yanıtlayacağım!

Oto Cevabı sıfırlamak için: \`s!otocevap-sil ${cmd}\``)
.setFooter(`Not: s!otocevap-liste komutu şu an bulunmamaktadır kısa sürede eklenecektir.`)
  
  message.channel.send({ embeds: [embed] })
  db.set(`otocevapp_${cmd}_${message.guild.id}`, { cmd: cmd, answer: cmdAnswer })
  
  
}
}