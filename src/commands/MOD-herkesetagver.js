const ms = require('ms');
const db = require('croxydb');
const Discord = require('discord.js');


module.exports = {
    slash: false,
    name: ['herkesetagver'],
    description: "Sunucudaki tüm üyelerin isimlerinin başına belirttiğiniz tagı ekler.",
    kategori: "Moderasyon",
 
  async execute(client, message, args, tools) {

  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: ` Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.` });
  
  const tag = args[0]
  if(!tag) return message.reply(` Herkese vereceğim tagı yazmalısın! 
**Örnek:** \`d!herkesetagver ⩛\``)
    
    //message.guild.members.cache.forEach(üyeler => üyeler.roles.add(rol));
  
  message.guild.members.cache.forEach(üyeler => üyeler.setNickname(`${tag} ${üyeler.user.username}`)
  .catch(err => message.channel.send({ content: ` Kurucu olduğun için ismini değiştiremiyorum!`}) ? console.log("Yetkim yok.") :  null)
    );
  
  message.reply({ content: " Başarılı bie şekilde herkesin ismine belirttiğin tagı ekledim." })

  
  
}
}