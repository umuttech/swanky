const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['token'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Botun tokenini verir xD.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTitle('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send({embeds:[ozelmesajuyari]});; }
    if (message.channel.type !== 'dm') {
      const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username + ' Al Kanka Tokenim')
    .setImage("https://c.tenor.com/lC0BLIM9TOIAAAAC/recep-ivedik-nah.gif")
    .setColor("RED")
    .setTimestamp()
    return message.channel.send({embeds:[embed]});
    }
      
      
    }
}