const Discord = require("discord.js"); //V13
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const client = new Discord.Client({intents: 98303})

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['oyver'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Botun oy verme linkini atar.",
    kategori: "Genel",
    async execute(client, message, args) {
      
      const prefix = "+"

let buton = new MessageButton()
.setStyle("LINK")
.setLabel("Oy Ver")
.setURL("https://top.gg/tr/bot/899825163699355668/vote")
.setEmoji("🔗")


let embed = new MessageEmbed()
.setThumbnail(client.user.displayAvatarURL({ size: 64 }))
.addField("**SwankyBot - Oy Ver**", `| **[Bana Destek Olmak İçin Oy Verebilirsin](https://top.gg/tr/bot/899825163699355668/vote)**`)
.setFooter("SwankyBot - İyi Günler Dileriz...")

message.channel.send({embeds: [embed], components: [new MessageActionRow({ components: [buton]})]}).then(async msg => {



        })
      
    }
}