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
 
<:armors_users:1022558807651532830> Sunucuda toplam **\`${message.guild.memberCount}\`** kullanıcı bulunmakta.
 
<:armors_voice:1022562872368308235> Ses kanallarında toplam **\`${message.guild.members.cache.filter(m => m.voice.channel).size}\`** kullanıcı bulunmakta.
 
<a:armors_booster:998291236228186222> Sunucuda toplam **\`${Boost}\`** boost bulunmakta. 
`)
.setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
.setTimestamp()
message.channel.send({embeds: [embed]})
       
    }
}