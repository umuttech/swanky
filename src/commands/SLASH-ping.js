const discord = require('discord.js')
 
module.exports = {
   slash: true, 
   name: ['ping'],
   description: "Botun gecikme süresini gösterir.",
   option: [],
 async execute(client, interaction) {
   
   interaction.reply({content: `
__Mesaj Ping:__ ** ${new Date().getTime() - interaction.createdTimestamp}ms**
__Bot Ping:__ **${client.ws.ping}ms**`})

 }
}