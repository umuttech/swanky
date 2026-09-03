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
            .addField('<a:armors_tacc:1014221717356412938> Sahip', `<@606572330457497641>`,true)
            .addField("<a:armors_saok:1022562532826824825> Prefix", `${ayarlar.prefix}`, true)
            .addField('<:armors_users:1022558807651532830> Kullanıcılar', `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
            .addField('<a:armors_saok:1022562532826824825> Sunucu Sayısı', `${client.guilds.cache.size}`,true)
            .addField('<:armors_message:1011737452836307005> Kanal Sayısı', `${client.channels.cache.size}`,true)
            .addField('<a:armors_saat:994660462140604416> Çalışma Süresi', `${aktiflik}`,true)
            .addField('<a:armors_saat:994660462140604416> Gecikme', `${client.ws.ping}ms`,true)
            .addField('<a:armors_saat:994660462140604416> Kullanıma Başlama Zamanı:', `19.10.2021`,true)
            .addField('<:armors_nodejs:1022557998331216024> Node.js Versiyon', process.version ,true)
            .addField('<:armors_djs:1022557386705219584> Discord.js Versiyon', Discord.version ,true)
            .addField("<:armors_admin:992367683729363034> Komut Sayısı", `${client.commands.size}`, true)
            .addField('<:armors_ram:1022560505145082007> Ram Kullanımı', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)}`+" mb",true)
            .addField("<:armors_windows:1022565673316134982> İşletim Sistemi", `Windows_NT 64 Bit`, true)
            .addField("<:armors_cpu:1022560538028421181> CPU", `\`${os.cpus().map(i => i.model)[0]}\``, true)
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