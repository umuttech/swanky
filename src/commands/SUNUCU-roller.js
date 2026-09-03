const Discord = require("discord.js")
const ayarlar = require("../base/settings.json")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['roller'],
    description: "Sunucudaki rolleri listeler.",
    kategori: "Sunucu",
    async execute(client, message, args) {

      
  const prefix = ayarlar.prefix // sizin prefixiniz
  if(message.guild.roles.cache.size <= 0) return;
  if(args[0] && args[0] === 'sırala') {
    const embed3 = new Discord.MessageEmbed()
    .setAuthor(message.guild.name+' Sunucusunun rolleri', message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setURL('https://discord.gg/RazmNQSQFa')
    .setDescription(`**Roller [${message.guild.roles.cache.size}]**
    
${message.guild.roles.cache.filter(x => x.name !== '@everyone').sort((a, b) => b.position-a.position).sort((a, b) => b.members.size-a.members.size).map(role => `${role} (**${role.members.size}**)`).join('\n')}`)
    .setFooter('Sorgulayan: '+message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setColor('GREEN');
    
    message.channel.send({embeds: [embed3]})
  };
  if(!args[0] || !client.guilds.cache.some(x => x.name.toLowerCase() === args.join(' ').toLowerCase())) {

    const embed2 = new Discord.MessageEmbed()
    .setAuthor(message.guild.name+' Sunucusunun rolleri', message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setURL('https://discord.gg/RazmNQSQFa')
    .setDescription(`**Roller [${message.guild.roles.cache.size}]**
    
${message.guild.roles.cache.filter(x => x.name !== '@everyone').sort((a, b) => b.position-a.position).map(role => `${role} (**${role.members.size}**)`).join('\n')}`)
    .setFooter(`Sorgulayan: ${message.author.tag} | Üye sayısını sıralamak için: ${prefix}roller sırala`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setColor('GREEN');
    
    message.channel.send({embeds: [embed2]})

  } else {

    message.guild = client.guilds.cache.find(x => x.name.toLowerCase() === args.join(' ').toLowerCase());
     const embed1 = new Discord.MessageEmbed()
    .setAuthor(message.guild.name+' Sunucusunun rolleri', message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setURL('https://discord.gg/RazmNQSQFa')
    .setDescription(`**Roller [${message.guild.roles.cache.size}]**
    
${message.guild.roles.cache.filter(x => x.name !== '@everyone').sort((a, b) => b.position-a.position).map(role => `${role} (**${role.members.size}**)`).join('\n')}`)
    .setFooter(`Sorgulayan: ${message.author.tag} | Üye sayısını sıralamak için: ${prefix}roller sırala`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setColor('GREEN');
    
    message.channel.send({embeds: [embed1]})

  };

    }
}