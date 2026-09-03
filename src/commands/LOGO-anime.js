const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['anime'],
    description: "yazdığınızm esajı anime logoya çevirir.",
    kategori: "Logo",
    async execute(client, message, args) {
      
        const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.**`)
  const linqo = `https://habbofont.net/font/battlebanzai/${yazi}.gif`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("BLACK")
  .setImage(linqo)
  .setFooter('Anime Logo Oluşturuldu')
   
  
      const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://habbofont.net/font/steampunk/${yazi}.gif`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}