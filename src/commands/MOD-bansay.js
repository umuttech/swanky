const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['bansay'],
    description: "Sunucuda yasaklı kullanıcı sayısını gösterir.",
    kategori: "Moderasyon",
    async execute(client, message, args) {
      
    var userlist = message.guild.bans.fetch()
    userlist.then(collection => {
    if(collection.first() == null){
      
    message.reply({content: `Bu sunucuda **0** banlı üye bulunmaktadır.` })
      
    } else {
    const data = collection.size
    
    message.reply({ content: `Bu sunucuda **${data}** banlı üye bulunmaktadır.` })
    }
})
     }
}