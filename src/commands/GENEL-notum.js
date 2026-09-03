const { MessageEmbed } = require("discord.js")
const diskord = require("discord.js")
const debe = require("croxydb")
module.exports = {
    slash: false,
    name: ['notum'],
    description: "Notunuzu gösterir.",
    kategori: "Genel",
  
    async execute(client, message, args) {
    let not = debe.fetch(`not_${message.author.id}`)
    if (!not) return message.reply("Notun Bulunmamaktadır!")
const embed = new MessageEmbed()
.addField("Notun", not)

message.reply({embeds: [embed]})

}
}