const discord = require('discord.js')
 
module.exports = {
   slash: true, 
   name: ['ping'],
   description: "Botun gecikme süresini gösterir.",
   option: [],
 async execute(client, interaction) {
   
   interaction.reply({content: `
<:armors_message:1011737452836307005> __Mesaj Ping:__ ** ${new Date().getTime() - interaction.createdTimestamp}ms**
<:armors_bots:998263060433219645> __Bot Ping:__ **${client.ws.ping}ms**`})

 }
}