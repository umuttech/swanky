const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['gökkuşağı'],
    description: "Yazdığınız mesajı gök kuşağı logoya çevirir.",
    kategori: "Logo",
    async execute(client, message, args) {
      
        const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.**`)
  const linqo = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=orlando-logo&text=${yazi}`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("RANDOM")
  .setImage(linqo)
  .setFooter('Gök Kuşağı Logo Oluşturuldu')
  
    const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://dummyimage.com/600x600/eb0949/000000&text=${yazi}`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}