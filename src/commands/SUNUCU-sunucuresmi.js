const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['sunucuresmi'],
    description: "Sunucunun resmini gösterir.",
    kategori: "Sunucu",
    async execute(client, message, args) {

        const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`${message.guild.name} | Sunucu Resmi`)
  .setImage(message.guild.iconURL({ dynamic: true }))
  
  
  const button = new Discord.MessageButton().setLabel('Resim URL').setStyle('LINK').setURL(`${message.guild.iconURL({ dynamic: true })}`);

        const row = new Discord.MessageActionRow().addComponents(button)
       message.channel.send({
           embeds:[embed],
           components:[row],
       })

    }
}