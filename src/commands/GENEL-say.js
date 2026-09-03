const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['say'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Sunucudaki üye sayısını vs. gösterir.",
    kategori: "Genel",
    async execute(client, message, args) {
 
let Boost = message.guild.premiumSubscriptionCount;

const embed = new Discord.MessageEmbed()
.setTitle('SwankyBot • Say')
.setThumbnail(message.guild.iconURL())
.setDescription(`
 
Sunucuda toplam **\`${message.guild.memberCount}\`** kullanıcı bulunmakta.
 
Ses kanallarında toplam **\`${message.guild.members.cache.filter(m => m.voice.channel).size}\`** kullanıcı bulunmakta.
 
Sunucuda toplam **\`${Boost}\`** boost bulunmakta. 
`)
.setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
.setTimestamp()
message.channel.send({embeds: [embed]})
       
    }
}