const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['kurucukim'],
    description: "Sunucunun kurucusunu gösterir.",
    kategori: "Sunucu",
    async execute(client, message, args) {

      const storm = new Discord.MessageEmbed()
      .setThumbnail(`${client.users.cache.get(message.guild.ownerId).displayAvatarURL()}`)
      .setDescription(`\`${message.guild.name}\` **adlı sunucunun kurucusu** \`${client.users.cache.get(message.guild.ownerId).tag}\` - \`(${client.users.cache.get(message.guild.ownerId).id})\` **adlı kullanıcıdır.**`)
      
       message.channel.send({embeds: [storm]});
  
message.react('')

    }
}