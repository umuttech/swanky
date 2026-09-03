const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require('../base/settings.json')


module.exports = {
    slash: false,
    name: ['svy-ayar'],
    description: "Seviye sistemi ayarlarsınız.",
    kategori: "Seviye",
    async execute(client, message, args) {

        let levellog = db.fetch(`level_log_${message.guild.id}`)
        let leveltebrik2 = db.fetch(`level_tebrik_${message.guild.id}`) 
        let son;
        if(leveltebrik2 === true){
            son = "Açık"
        }else{
            son = "Kapalı"
        }



        const menu = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`
        **${ayarlar.prefix}svy-ayar log** Seviye atlandığında mesaj atılacak kanalı belirlersiniz.
        **${ayarlar.prefix}svy-ayar tebrik** Kişi seviye atladığında tebrik eder ve log kanalına mesaj gönderir. [Otomatik: Kapalı]
        
        > Şu anda kullanılan ayarlar 
        Tebrik Mesajı: **${son}**
        Seviye log kanalı: <#${levellog ? levellog : "Ayarlanmamış"}>
        Mesaj başına XP: **1** (Değiştirilemez)
        Kaç XP olduğunda seviye atlanacak?: **100** (Değiştirilemez)

        \`Not:\` **Terik mesajını açmazsanız log 'a mesaj göndermez ve üyeye __SSCoin__ ödülü vermez.**
        `)
        .setFooter(client.user.username, client.user.avatarURL())

        if(!args[0]) return message.reply({embeds:[menu]})

        if(args[0] === "tebrik"){
            let kontrol1 = db.fetch(`level_tebrik_${message.guild.id}`)
            console.log(kontrol1)
            if(kontrol1){
                db.set(`level_tebrik_${message.guild.id}`, false)
                message.reply(`Tepbik mesajı başarıyla kapatıldı.`)
            }
            if(!kontrol1){
                db.set(`level_tebrik_${message.guild.id}`, true)
                message.reply(`Tebrik mesajı başarıyla açıldı.`)
            }

        }
        if(args[0] === "log"){
            let kanal =  message.mentions.channels.first();
            if(!kanal) return message.reply(`Lütfen seviye log kanalını belirtiniz.`)
            db.set(`level_log_${message.guild.id}`, kanal.id)
            message.reply(`Seviye log kanalı başarıyla ${kanal} olarak ayarlandı.`)
        }




}
}