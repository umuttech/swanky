const Discord = require("discord.js")
const moment = require("moment");
moment.locale("tr")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['kullanıcıbilgi'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Sizin veya belirttiğiniz kişinin kullanıcı bilgisini gösterir.",
    kategori: "Genel",
    async execute(client, message, args) {
      
        let storm = message.mentions.members.first() || message.member

  let dark = message.guild.members.cache.filter(mr => mr.joinedTimestamp < storm.joinedTimestamp).size + 1

  let embed = new Discord.MessageEmbed()
    .setTitle(storm.user.tag, client.user.avatarURL())
    .setThumbnail(storm.user.avatarURL())
    .setColor(storm.displayHexColor === '#000000' ? '#ffffff' : storm.displayHexColor)
    .addField('Üye Bilgisi:',` 
**Kullanıcı İsmi:** ${storm.user.username}
**Sunucuya Giriş Tarihi:** ${moment(storm.joinedTimestamp).format('LLLL')}
**Sunucuya Giriş Sırası:** ${dark}.
**Rolleri:** ${storm.roles.cache.map(cs => cs).join("|")}`)
    .addField('Kullanıcı Bilgisi:', `
**Tag:** ${storm.user.tag}
**Kullanıcı ID:** ${storm.user.id}
**Kuruluş Tarihi:** ${moment(storm.user.createdTimestamp).format('LLLL')}`)
    .setFooter(client.user.username, client.user.avatarURL())
    .setTimestamp()
  message.channel.send({embeds: [embed]})
       
    }
}