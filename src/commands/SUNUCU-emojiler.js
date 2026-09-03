const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['emojiler'],
    description: "Sunucudaki emojileri gösterir.",
    kategori: "Sunucu",
    async execute(client, message, args) {

let animEmotes = [], staticEmotes = [];
message.guild.emojis.cache.forEach((x) => {
x.animated ? animEmotes.push(`<a:${x.name}:${x.id}>`) : staticEmotes.push(`<:${x.name}:${x.id}>`);
})
        try {     
const embed = new Discord.MessageEmbed()
.setTimestamp()
.setColor('#000000')
.setTitle(`${message.guild.name} - Emoji Listesi`)
.setDescription(`_**Hareketli Emojiler**_\n${animEmotes}\n\n_**Hareketsiz Emojiler**_\n${staticEmotes}`)
message.channel.send({embeds: [embed]})
      } catch (err) {
        const embed = new Discord.MessageEmbed()
            .addField(`Sunucuda Bulunan Emojiler`, 'Üzgünüm ama sunucunuzda ya çok fazla emoji bulunuyor ya da hiç emoji bulunmuyor. Bunları gösteremiyorum. Discord buna izin vermiyor.')
            .setColor('RED')
          .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
            .setTimestamp()
        message.channel.send({embeds: [embed]})
                              
    }

    }
}