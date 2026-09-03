const Discord = require("discord.js")
const moment = require('moment');

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['kanalbilgi'],
    description: "Belirttiğiniz ",
    kategori: "Sunucu",
    async execute(client, message, args) {

        const ok = message.client.emojis.cache.get("");
           var embed = new Discord.MessageEmbed()
                .setAuthor('#' + message.channel.name, message.guild.iconURL({dynamic: true}))
                .addField(" ID",`${message.channel.id}`)
                if (message.channel.nsfw) {
                    embed.addField(" Uygunsuz İçerik", "<a:armors_onay1:990609433816092692>", true)
                }
                else {
                    embed.addField(" Uygunsuz İçerik", "<a:armors_iptal:990609550153486357>", true)
                }
                embed.addField('Oluşturulduğu Tarih:', moment(message.channel.createdAt).format('DD/MM/YYYY'), true)
                .setColor(3447003)
                .setThumbnail(message.guild.iconURL({dynamic: true}))
                .setFooter(client.user.username,  client.user.avatarURL({dynamic: true}))
            message.channel.send({embeds: [embed]});

    }
}