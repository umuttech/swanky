const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['yapımcı'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Sahibimi gösterir.",
    kategori: "Genel",
    async execute(client, message, args) {
       
      const storm = new Discord.MessageEmbed()
.setAuthor('Yapımcım', client.user.avatarURL())
.setColor('#ff0000')
.setDescription(`\n<@606572330457497641>\n============\n⩛ Storm#6110`)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komutu kullanan kullanıcı ${message.author.tag}`)
message.channel.send({embeds:[storm]});
      
    }
}