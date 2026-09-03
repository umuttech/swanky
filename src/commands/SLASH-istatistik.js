const Discord = require("discord.js")
const moment = require('moment')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
require('moment-duration-format');
const os = require('os');
const ayarlar = require('../base/settings.json') 
const prettyMilliseconds = require("pretty-ms")

module.exports = {
    slash: true, //kodun slash olmadığını belirttik.
    name: ['istatistik'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Botun istatistiklerini gösterir.",
    kategori: "Genel",
    async execute(client, interaction, args) {
      
          const pixel = []
        client.guilds.cache.find((item, i) => {
            pixel.push(item.memberCount)
        })
        var toplam = 0
        for (var i = 0; i < pixel.length; i++) {
            if (isNaN(pixel[i])) {
                continue;
            }

            toplam += Number(pixel[i])
        }
        const aktiflik = moment.duration(client.uptime).format("D [gün], H [saat], m [dakika], s [saniye]")

        const istatistik = new Discord.MessageEmbed()
            .setTitle('SwankyBot İstatistik')
            .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
            .addField('Sahip', `<@606572330457497641>`,true)
            .addField("Prefix", `${ayarlar.prefix}`, true)
            .addField('Kullanıcılar', `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
            .addField('Sunucu Sayısı', `${client.guilds.cache.size}`,true)
            .addField('Kanal Sayısı', `${client.channels.cache.size}`,true)
            .addField('Çalışma Süresi', `${aktiflik}`,true)
            .addField('Gecikme', `${client.ws.ping}ms`,true)
            .addField('Kullanıma Başlama Zamanı:', `19.10.2021`,true)
            .addField('Node.js Versiyon', process.version ,true)
            .addField('Discord.js Versiyon', Discord.version ,true)
            .addField("Komut Sayısı", `${client.commands.size}`, true)
            .addField('Ram Kullanımı', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)}`+" mb",true)
            .addField("İşletim Sistemi", `Windows_NT 64 Bit`, true)
            .addField("CPU", `\`${os.cpus().map(i => i.model)[0]}\``, true)
            .setTimestamp()
            .setFooter(`SwankyBot İstatistik`)
      
                const button = new MessageButton().setLabel('Davet Et').setStyle('LINK').setURL('https://discord.com/oauth2/authorize?client_id=899825163699355668&scope=bot&permissions=27648876671');
const button1 = new MessageButton().setLabel('Destek').setStyle('LINK').setURL('https://discord.gg/ADqjEQ8CqP')
const button2 = new MessageButton().setLabel('Oy Ver').setStyle('LINK').setURL('https://top.gg/tr/bot/899825163699355668/vote')

        const row = new MessageActionRow().addComponents(button).addComponents(button1).addComponents(button2)
       interaction.reply({
           embeds:[istatistik],
           components:[row],
       })
       
    }
}