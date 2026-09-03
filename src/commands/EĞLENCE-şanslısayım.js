const { Discord } = require("discord.js");


module.exports = {
   slash: false,
   name: ['şanslısayım'],
   description: "Şanslı sayınızı tahmin eder.",
   kategori: "Eğlence",
 
async execute(client, message, args) {  
   const random = Math.floor(Math.random() * 99) + 1
   
   message.reply(`:thinking: Hmm... Şanslı sayın **${random}** `)
  
}
}
