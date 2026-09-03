const Discord = require("discord.js")
const fetch = require('node-fetch')

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['youtube'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Ses kanalında YouTube açarsınız.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
  if(!message.member.voice.channel) return message.reply('**Herhangi bir ses kanalında bulunmuyorsun.**')

fetch(`https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "880218394199220334",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
      
let embed = new Discord.MessageEmbed()
.addField(`SwankyBot`,`[YouTube Açmak İçin Buraya Tıkla](https://discord.gg/${invite.code})`)
message.channel.send({embeds: [embed]});
                    
                })
      
    }
}