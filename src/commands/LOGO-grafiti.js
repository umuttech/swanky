const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['grafiti'],
    description: "Yazdığınız mesajı grafiti logoya çevirir.",
    kategori: "Logo",
    async execute(client, message, args) {
      
        let yazı = args[0]
        
  if(!yazı) return message.channel.send("Logo oluşturmak için bir yazı girmelisin.")
  let api = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=graffiti-logo&text=${yazı}`
  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setImage(api)
  .setFooter('Grafiti Logo Oluşturuldu')
 
  
    const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://dummyimage.com/600x600/eb0949/000000&text=${yazı}`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}