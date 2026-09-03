const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['rolaç'],
    description: "Belirttiğiniz isimde rol açar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {


      if (!message.member.permissions.has("MANAGE_ROLES")) 
  return message.reply("<a:armors_iptal:990609550153486357> Bu komutu kullanabilmek için `Rolleri yönet` yetkisine sahip olmanız gerek")
  
let guild = message.guild;
let isim = args.slice(0).join(" ");
if (!isim) 
  return message.reply("Bir isim girmeniz gerek")

guild.roles.create({
  name: isim
})
  .then(role => message.reply(`<a:armors_onay:990226710924521502> \`${role.name}\` adında yeni rol oluşturuldu`))
  .catch(console.error)
      
    }
}