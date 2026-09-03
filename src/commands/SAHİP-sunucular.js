const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['sunucular'],
    description: "Botun bulunduğu sunucular ID'leri ile gösterir.",
    kategori: "Sahip",
    async execute(client, message, args) {

          if(message.author.id === "606572330457497641") { // Discord Hesap ID'niz (Bot Sahip ID)

    let karma = []
    client.guilds.cache.forEach(x =>{
      
      const embed = new Discord.MessageEmbed()
      .setDescription(`Sunucu ID: ${x.id}\nSunucu İsmi: ${x.name}\nÜye Sayısı: ${x.memberCount}`)
      
        message.channel.send({embeds: [embed]}) //Sunucu Adı Yazınız.
    })

    } else { 
        message.reply('<a:armors_iptal:990609550153486357> Sahibim sen değilsin dostum!')
    }

    }
}