const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js") 
const ms = require("ms")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['yavaşmod'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Kanalda belirttiğiniz süre kadar yavaş mod ayarlar. Örn: 5**s** şeklinde yazılmalı.",
    kategori: "Moderasyon",
    async execute(client, message, args) {
    
    const prefix =  "!";
    if (!args[0]) {

        return message.channel.send({ content: `<a:armors_iptal:990609550153486357> Lütfen Geçerli Bir Zaman Yaz!
Zaman Kavramları - h(saat), m(dakika), s(saniye)
(Örnek -  ${prefix}yavaşmod 5s)` })
    }
    const currentSlowmode = message.channel.rateLimitPerUser

    if (args[0] === 'off') {
        if (currentSlowmode === 0) {

            return message.channel.send({ content: `<a:armors_iptal:990609550153486357> Yavaş Mod Zaten Kapalı!`})
        }
        message.channel.setRateLimitPerUser(0)

        return message.channel.send({ content: `<a:armors_onay1:990609433816092692> Yavaş Mod Kapatıldı!`})
    }

    const time = ms(args[0]) / 1000
    if (isNaN(time)) {
        return message.channel.send({ content: `<a:armors_iptal:990609550153486357> Lütfen Geçerli Bir Zaman Yaz!
Zaman Kavramları - h(saat), m(dakika), s(saniye)
Örnek: ${prefix}yavaşmod 5s (Süre "5**s**" gibi yazılmaz ise çalışmaz.)`})
    }

    if (time > 21600000) {

        return message.channel.send({ content: `Yavaş Mod En Fazla **6 Saat** Olabilir!` })
    }

    if (currentSlowmode === time) {
      
        return message.channel.send({ content: `Yavaş Mod Zaten **${args[0]}** Olarak Ayarlanmış!` })
    }

    let slowmode = await message.channel.setRateLimitPerUser(time)
    let afterSlowmode = message.channel.rateLimitPerUser
    if (afterSlowmode > 0) {
        return message.channel.send({ content: `<a:armors_onay1:990609433816092692> Yavaş Mod Başarıyla **${args[0]}** Olarak Ayarlandı!` })
    }
      
    }
}