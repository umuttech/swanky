const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['oylama'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Oylama yaparsınız.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
   message.delete();
   let question = args.join(' ');
   let user = message.author.username
   if (!question) return message.channel.send({ content: ` **Yazı Yazman Gerek**  `}).then(m => m.delete(5000));
     console.log("oylama komutu " + message.author.username + '#' + message.author.discriminator + " tarafından kullanıldı.")
     
   
       const embed = new Discord.MessageEmbed()
       .setColor("RED")
       .setThumbnail(client.user.displayAvatarURL())
       .setTimestamp()
       .setFooter({text:'Oylama Sistemi', iconURL: client.user.displayAvatarURL() })
       .addField(`SwankyBot - Oylama`, `\n**${question}**`)
         message.react('👍');
         message.react('👎');
   message.channel.send({ embeds: [embed]})
      
    }
}