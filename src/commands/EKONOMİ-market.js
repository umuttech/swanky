const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require('../base/settings.json')


module.exports = {
    slash: false,
    name: ['market'],
    description: "Marketi görüntülersiniz.",
    kategori: "Ekonomi",
  async execute(client, message, args) {


const menu = new Discord.MessageEmbed()
.setThumbnail(message.author.displayAvatarURL())
.setDescription(`Kullanım: ${ayarlar.prefix}market al / sat <ÜrünAdı> <Adet>`)
.addField(`Alınabilir`,
`Kazma (5 kullanım hakkı): **150** \`SSCoin\`
Balta (5 kullanım hakkı): **110** \`SSCoin\`
Elmas: **70** \`SSCoin\`
Altın: **60** \`SSCoin\`
Demir: **45** \`SSCoin\`
Gümüş: **40** \`SSCoin\`
Bor: **35** \`SSCoin\`
Bronz: **30** \`SSCoin\`
Kömür: **25** \`SSCoin\`
Odun: **20** \`SSCoin\``,true)
.addField(`Satılabilir`,
`Elmas: **55** \`SSCoin\`
Altın: **50** \`SSCoin\`
Demir: **35** \`SSCoin\`
Gümüş: **30** \`SSCoin\`
Bor: **25** \`SSCoin\`
Bronz: ** 20** \`SSCoin\`
Kömür: **20** \`SSCoin\`
Odun: **10** \`SSCoin\``, true)
.setFooter(client.user.username + ` Ekonomi Sistemi - Market`, client.user.avatarURL())
.setTimestamp()

if(!args[0]) return message.reply({embeds:[menu]})

if(args[0] === "sat"){

    if(args[1] === "odun"){
        let urun = "odun"
        let urun2= "Odun"
        let fıyat = 10
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`Çantanda **odun** bulunmamakta.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak **odun** miktarını belirt.`)
        if(isNaN(miktar))return message.reply(`Miktar sadece **sayı** olmalıdır.`) 
        if(miktar > odun) message.reply(`Çantandaki **odun** sayısı yetersiz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`${miktar} adet **${urun2}** başarıyla satıldı ve ${son} SSCoin gelir elde edildi.`)
    }
    if(args[1] === "elmas"){
        let urun = "elmas"
        let urun2= "Elmas"
        let fıyat = 55
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`Çantanda **elmas** bulunmamakta.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak **elmas** miktarı Belirt.`)
        if(isNaN(miktar))return message.reply(`Miktar sadece **sayı** olmalıdır.`) 
        if(miktar > odun) message.reply(`Çantandaki **elmas** sayısı yetersiz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`${miktar} adet **${urun2}** başarıyla satıldı ve ${son} SSCoin gelir elde edildi.`)
    }
    if(args[1] === "altın"){
        let urun = "altın"
        let urun2= "Altın"
        let fıyat = 50
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`Çantanda **altın** bulunmamakta.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak **altın** miktarını belirt.`)
        if(isNaN(miktar))return message.reply(`Miktar sadece **sayı** olmalıdır.`) 
        if(miktar > odun) message.reply(`Çantandaki **altın** sayısı yetersiz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`${miktar} adet **${urun2}** başarıyla satıldı ve ${son} SSCoin gelir elde edildi.`)
    }
    if(args[1] === "kömür"){
        let urun = "kömür"
        let urun2= "Kömür"
        let fıyat = 20
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`Çantanda **kömür** bulunmamakta.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak **kömür** miktarını elirt.`)
        if(isNaN(miktar))return message.reply(`Miktar sadece **sayı** olmalıdır.`) 
        if(miktar > odun) message.reply(`Çantandaki **kömür** sayısı yetersiz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`${miktar} adet **${urun2}** başarıyla satıldı ve ${son} SSCoin gelir elde edildi.`)
    }
    if(args[1] === "demir"){
        let urun = "demir"
        let urun2= "Demir"
        let fıyat = 35
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`$Çantanda **demir** bulunmamakta.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak **demir** miktarını belirt.`)
        if(isNaN(miktar))return message.reply(`Miktar sadece **sayı** olmalıdır.`) 
        if(miktar > odun) message.reply(`Çantandaki **demir** sayısı yetersiz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`${miktar} adet **${urun2}** başarıyla satıldı ve ${son} SSCoin gelir elde edildi.`)
    }
    if(args[1] === "gümüş"){
        let urun = "gümüş"
        let urun2= "Gümüş"
        let fıyat = 30
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`Çantanda **gümüş** bulunmamakta.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak **gümüş** miktarını belirt.`)
        if(isNaN(miktar))return message.reply(`Miktar sadece **sayı* olmalıdır.`) 
        if(miktar > odun) message.reply(`Çantandaki **gümüş** sayısı yetersiz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`${miktar} adet **${urun2}** başarıyla satıldı ve ${son} SSCoin gelir elde edildi.`)
    }
    if(args[1] === "bronz"){
        let urun = "bronz"
        let urun2= "Bronz"
        let fıyat = 20
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`Çantanda **bronz** bulunmamakta.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak **bronz** miktarını belirt.`)
        if(isNaN(miktar))return message.reply(`Miktar sadece **sayı* olmalıdır.`) 
        if(miktar > odun) message.reply(`Çantandaki **bronz** sayısı yetersiz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`${miktar} adet **${urun2}** başarıyla satıldı ve ${son} SSCoin gelir elde edildi.`)
    }
    if(args[1] === "bor"){
        let urun = "bor"
        let urun2= "Bor"
        let fıyat = 25
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`Çantanda **bor** bulunmamakta.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak **bor** miktarını belirt.`)
        if(isNaN(miktar))return message.reply(`Miktar sadece **sayı* olmalıdır.`) 
        if(miktar > odun) message.reply(`Çantandaki **bor** sayısı yetersiz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`${miktar} adet **${urun2}** başarıyla satıldı ve ${son} SSCoin gelir elde edildi.`)
    }

}



if(args[0] === "al"){
    
if(args[1] === "balta"){
    let urun = "balta"
    let urun2 = "Balta"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **balta** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*110
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
   if(args[1] === "kazma"){
    let urun = "kazma"
    let urun2 = "Kazma"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **kazma** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*150
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
    if(args[1] === "elmas"){
    let urun = "elmas"
    let urun2 = "Elmas"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **elmas** fiyatını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*70
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
    if(args[1] === "altın"){
    let urun = "altın"
    let urun2 = "Altın"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **altın** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*60
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
    if(args[1] === "demir"){
    let urun = "demir"
    let urun2 = "Demir"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **demir** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*45
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
    if(args[1] === "kömür"){
    let urun = "kömür"
    let urun2 = "Kömür"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **kömür** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*25
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var..`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
    if(args[1] === "odun"){
    let urun = "odun"
    let urun2 = "Odun"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **odun** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*20
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
    if(args[1] === "bronz"){
    let urun = "bronz"
    let urun2 = "Bronz"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **bronz** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*30
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
    if(args[1] === "bor"){
    let urun = "bor"
    let urun2 = "Bor"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **bor** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*35
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
    if(args[1] === "gümüş"){
    let urun = "gümüş"
    let urun2 = "Gümüş"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak **gümüş** miktarını belirt.`)
    if(isNaN(miktar)) return message.reply(`Miktar sadece **sayı** olmalıdır.`)
    var son = miktar*40
    if(coin < son) return message.reply(`${son-coin} SSCoin 'e ihtiyacın var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde ${son} SSCoin 'e ${miktar} adet **${urun2}** aldın.`)
    }
}

}
}