const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['kalın'],
    description: "Yazdığınız mesajı kalın logoya çevirir.",
    kategori: "Logo",
    async execute(client, message, args) {
      
        const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.**`)
  const linqo = `https://habbofont.net/font/shalimar_big/${yazi}.gif`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("RANDOM")
  .setImage(linqo)
  .setFooter('Kalın Logo Oluşturuldu')
 
    const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://dummyimage.com/600x600/eb0949/000000&text=${yazi}`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}