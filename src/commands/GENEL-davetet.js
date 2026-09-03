const Discord = require("discord.js"); //V13
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const client = new Discord.Client({intents: 98303})

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['davetet'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Boyun davet etme linkini atar.",
    kategori: "Genel",
    async execute(client, message, args) {
      
      const prefix = "+"

let buton = new MessageButton()
.setStyle("LINK")
.setLabel("Davet Et")
.setURL("https://discord.com/oauth2/authorize?client_id=899825163699355668&scope=bot&permissions=27648876671")
.setEmoji("🔗")


let embed = new MessageEmbed()
.setThumbnail(client.user.displayAvatarURL({ size: 64 }))
.addField("**SwankyBot - Davet Et**", `<:armors_bots:998263060433219645> | **[Beni Bu Linkten Sunucunuza Ekleyebilirsiniz](https://discord.com/oauth2/authorize?client_id=899825163699355668&scope=bot&permissions=27648876671)**`)
.setFooter("SwankyBot - İyi Günler Dileriz...")

message.channel.send({embeds: [embed], components: [new MessageActionRow({ components: [buton]})]}).then(async msg => {



        })
      
    }
}

/*const Discord = require("discord.js"); //V13
const client = new Discord.Client({intents: 98303})
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['davetet'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Botun davet linkini atar.",
    kategori: "Genel",
    async execute(client, message, args) {
      
      const prefix = "+"

let buton = new MessageButton()
.setStyle("LINK")
.setLabel("Davet")
.setURL(" https://discord.com/oauth2/authorize?client_id=899825163699355668&scope=bot&permissions=27648876671")
.setEmoji("🔗")


let embed = new MessageEmbed()
.setThumbnail(client.user.displayAvatarURL({ size: 64 }))
.addField("**DarkBOT - Davet**", `<:armors_bots:998263060433219645> | **[Beni Bu Linkten Sunucunuza Ekleyebilirsiniz]( https://discord.com/oauth2/authorize?client_id=899825163699355668&scope=bot&permissions=27648876671)**`)
.setFooter("DarkBOT - İyi Günler Dileriz...")
.setColor('#0027ff')

message.channel.send({embeds: [embed], components: [new MessageActionRow({ components: [buton]})]}).then(async msg => {



        })
      
    }
}
*/