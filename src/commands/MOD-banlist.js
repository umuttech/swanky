const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['banlist'],
    description: "Sunucuda yasaklanan kullanıcıları listeler.",
    kategori: "Moderasyon",
    async execute(client, message, args) {
      
    var userlist = message.guild.bans.fetch()
    userlist.then(collection => {
    if(collection.first() == null){
      
    const embed = new Discord.MessageEmbed()
    .setDescription("Sunucunuzda Yasaklanan Kullanıcı Yok!")      
    .setColor("RED")
    message.channel.send({embeds: [embed]})
      
    } else {
    const data = collection.map(mr => "**" + mr.user.tag + "**").slice(0, 80).join(" `|` ")
    const embed2 = new Discord.MessageEmbed()
    .setTitle("SwankyBot - Ban List" + " [" + collection.size + "]")
    .setColor("#ff0000")
    .setDescription(data)
    
    message.channel.send({embeds: [embed2]})
    }
})
     }
}
