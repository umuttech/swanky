const Discord = require("discord.js")
const db = require("orio.db")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['reklamengel'],
    description: "Sunucuda rekalm yapılmasını engeller, 3 reklam yapan sunucudan atılır.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

          if (!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send('Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')
  
    if (!args[0]) return message.channel.send('Sistemi kullanabilmek için: `s!reklamengel aç/kapat` yazın.')

    if (args[0] == 'aç') {
        db.set(`reklamkick_${message.guild.id}`, 'acik')
      
      const embed = new Discord.MessageEmbed()
      .setDescription(`Reklam kick sistemi açıldı. Reklam yapanlar 3 uyarıdan sonra kicklenecek.`)
      
        message.channel.send({embeds: [embed]})
    }
    if (args[0] == 'kapat') {
        db.set(`reklamkick_${message.guild.id}`, 'kapali')
      
      const embed1 = new Discord.MessageEmbed()
      .setDescription(`Reklam kick sistemi kapatıldı`)
      
        message.channel.send({embeds: [embed1]})

    }

    }
}