const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['discord'],
    description: "Yazdığınız mesajı discord logoya çevirir",
    kategori: "Logo",
    async execute(client, message, args) {
 
      
  let isim = args.slice(0).join("+")

  if(!isim)return message.channel.send("Lütfen Bişey Yaz")
      
let link = `https://flamingtext.com/net-fu/proxy_form.cgi?script=adidas-logo&fontname=ethnocentric&text=${isim}&script=adidas-logo&text=Discord&fontname=ethnocentric&fillTextColor=%236d81e7&fillOutlineColor=%23fbfaf9&shadowType=0&backgroundRadio=0&imageoutput=true`

  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("BLUE")
  .setImage(link)
  .setFooter('Discord Logo Oluşturuldu')
  
    const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://flamingtext.com/net-fu/proxy_form.cgi?script=adidas-logo&fontname=ethnocentric&text=${isim}&script=adidas-logo&text=Discord&fontname=ethnocentric&fillTextColor=%236d81e7&fillOutlineColor=%23fbfaf9&shadowType=0&backgroundRadio=0&imageoutput=true`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}