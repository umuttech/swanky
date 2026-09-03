const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['alev2'],
    description: "Yazdığınız mesajı alev logoya çevirir.",
    kategori: "Logo",
    async execute(client, message, args) {

  const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.**`)
  const linqo = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=fire-logo&text=${yazi}`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("RANDOM")
  .setImage(linqo)
  .setFooter('Alevli Logo Oluşturuldu')
   
  
    const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=fire-logo&text=${yazi}`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}