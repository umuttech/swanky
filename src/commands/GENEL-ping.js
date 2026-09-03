const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['ping'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Botun gecikme süresini gösterir (Resimli).",
    kategori: "Genel",
    async execute(client, message, args) {
      
      message.reply({ content: `
__Mesaj Ping:__ ** ${new Date().getTime() - message.createdTimestamp}ms**
__Bot Ping:__ **${client.ws.ping}ms**`})
       
    }
}