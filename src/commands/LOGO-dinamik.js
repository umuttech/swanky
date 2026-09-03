const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['dinamik'],
    description: "Yazdığınız mesajı dinamik logoya çevirir.",
    kategori: "Logo",
    async execute(client, message, args) {
 
      
        const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.**`)
  const linqo = `https://dynamic.brandcrowd.com/asset/logo/f802ad87-f5ae-491f-9a02-89ee701b588f/logo?v=4&text=${yazi}`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("RANDOM")
  .setImage(linqo)
  .setFooter('Dinamik Logo Oluşturuldu')
  
    const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://dummyimage.com/600x600/eb0949/000000&text=${yazi}`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}