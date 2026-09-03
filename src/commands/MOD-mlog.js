const Discord = require("discord.js");
const db = require("croxydb")
module.exports = {
  slash: false,
  name: ['mlog'],
  description: "Mesaj log ayarlarsınız.",
  kategori: "Moderasyon",

async execute(client, message, args) {
  
      if(!message.member.permissions.has("Administrator")) return message.reply("Bu Komutu Kullanmak İçin **Yönetici** Yetkisine Sahip Olmalısın!");
//Tanımlar
let log = message.mentions.channels.first();
let logkanal = await db.get(`log_${message.guild.id}`)
    
  //Embedler
  const qyok = new Discord.MessageEmbed().setTitle('İşlem başarısız.').setDescription('Öncelikle bir mesaj log kanalı ayarlamalısın.').setFooter(`SwankyBot Mesaj Log`).setTimestamp().setThumbnail(message.guild.iconURL({ size: 64})).setColor('RED')
  const qvar = new Discord.MessageEmbed().setTitle('İşlem başarılı.').setDescription('Mesaj Log kanalı başarıyla kaldırıldı.').setFooter(`SwankyBot Mesaj Log`).setTimestamp().setThumbnail(message.guild.iconURL({ size: 64})).setColor('WHITE')
  const kyok = new Discord.MessageEmbed().setTitle('İşlem başarısız.').setDescription('Mesaj Log kanalı belirtiniz.').setFooter(`SwankyBot Mesaj Log`).setTimestamp().setThumbnail(message.guild.iconURL({ size: 64})).setColor('RED')
  const qnix = new Discord.MessageEmbed().setTitle('İşlem başarılı.').setDescription(`Mesaj Log kanalı ayarlandı.`).setFooter(`SwankyBot Mesaj Log`).setTimestamp().setThumbnail(message.guild.iconURL({ size: 64})).setColor('WHITE')
  //

    if(args[0] === 'sıfırla' || args[0] === 'sil') {
    if(!logkanal) return message.channel.send({embeds : [qyok]})
      
    db.delete(`log_${message.guild.id}`)
    return message.channel.send({embeds : [qvar]})
    }
    if(!log) return message.channel.send({embeds : [kyok]})
    
    db.set(`log_${message.guild.id}`, log.id)
    message.channel.send({embeds : [qnix]});


  }
}