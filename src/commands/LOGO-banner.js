const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['banner'],
    description: "Yazdığınız mesajı bannera çevirir.",
    kategori: "Logo",
    async execute(client, message, args) {
      
        const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.**`)
  const linqo = `https://dummyimage.com/2000x500/33363c/ffffff&text=${yazi}`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Banner")
  .setColor("RANDOM")
  .setImage(linqo)
  .setFooter('Banner Oluşturuldu')
   
  
      const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://habbofont.net/font/steampunk/${yazi}.gif`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}