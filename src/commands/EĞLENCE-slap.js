const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['slap'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Belirttiğiniz kişiyi tokatlarsınız.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
let user = message.mentions.users.first();
if(!user) return message.reply({ content: `Tokat atacağın kişiyi etiketle!` })

let random = ["https://media.giphy.com/media/sQ4VqqaZ64QKlYcd88/giphy.gif", "https://media.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif", "https://media.giphy.com/media/u8maN0dMhVWPS/giphy.gif", "https://media.giphy.com/media/8JuLYKFmNYE0wJDGLa/giphy.gif", "https://media.giphy.com/media/J07H1nnjD6I6i18ouB/giphy.gif", "http://i.imgur.com/d9thUdx.gif", "http://i.imgur.com/iekwz4h.gif"]
  let gif = (random[Math.floor(Math.random() * random.length)])
  
    const slap =new Discord.MessageEmbed()
    .setColor("RANDOM")
.setDescription(`**${message.author}, ${user} Adlı Kişiyi Tokatladı!**`)
    .setImage(gif)
    message.channel.send({embeds: [slap]});
      
    }
}