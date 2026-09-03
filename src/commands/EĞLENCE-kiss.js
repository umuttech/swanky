const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['kiss'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Belirttiğiniz kişiyi öpersiniz.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
let user = message.mentions.users.first() || client.users.cache.get(args[0])    
  

if(!user) return message.channel.send("Kimi öpeceğini söylemedin! **^-^**");



if(user.id === message.author.id) {
  
  const embed1 = new Discord.MessageEmbed()
  .setTitle(`K-kendini öpemezsin 😳`)
  .setURL(`https://tenor.com/view/h%C3%B6st-ulan-gif-24461766`)
   
 message.reply({embeds: [embed1]})

  return
}
   let random = ["https://media2.giphy.com/media/nyGFcsP0kAobm/giphy.gif","https://media1.tenor.com/images/f03f245e14fdfcacaf06318cdc667a03/tenor.gif?itemid=15111568", "https://i.pinimg.com/originals/f5/34/19/f53419e78c719c313b64378168fa94cc.gif", "https://media1.giphy.com/media/KH1CTZtw1iP3W/source.gif", "https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif", "http://i.imgur.com/p6hNamc.gif", "http://i.imgur.com/W9htMol.gif", "https://tenor.com/view/ted-kisses-kiss-blowing-kisses-flying-kiss-gif-5169025"]
  let gif = (random[Math.floor(Math.random() * random.length)])
  
let dcs = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription('<@!'+user.id+'> **Bir öpücük aldı** :) ')
  .setFooter({text:'Kiss', iconURL: message.author.avatarURL() })
  .setImage(gif) 
  .setTimestamp()
  .setColor('#EF00FE')
message.channel.send({ embeds: [dcs] }).then(m => {
 
m.react('') 

 
 })  
      
    }
}