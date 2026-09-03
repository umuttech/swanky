const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['ping'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Botun gecikme süresini gösterir (Resimli).",
    kategori: "Genel",
    async execute(client, message, args) {
      
      message.reply({ content: `
<:armors_message:1011737452836307005> __Mesaj Ping:__ ** ${new Date().getTime() - message.createdTimestamp}ms**
<:armors_bots:998263060433219645> __Bot Ping:__ **${client.ws.ping}ms**`})
       
    }
}