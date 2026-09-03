const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['müzik'],
    description: "Yazdığınız mesajı müzik logoya çevirir",
    kategori: "Logo",
    async execute(client, message, args) {
 
      
  let isim = args.slice(0).join("+")

  if(!isim)return message.channel.send("Lütfen Bişey Yaz")
      
let link = `https://bcassetcdn.com/asset/logo/545fa973-da1e-428a-bf78-f9f8b0717cdb/logo?v=4&text=${isim}`

  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("#f8ff00")
  .setImage(link)
  .setFooter('Müzik Logo Oluşturuldu')
  
    const button = new Discord.MessageButton().setLabel('URL').setStyle('LINK').setURL(`https://bcassetcdn.com/asset/logo/545fa973-da1e-428a-bf78-f9f8b0717cdb/logo?v=4&text=${isim}`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })
      
    }
}