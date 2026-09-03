const Discord = require("discord.js")
const db = require("croxydb")

module.exports = {
  slash: true,
  name: ['başvuru-kapat'],
  description: "Yetkili Alım sistemi kapatırsınız.",
  option: [],
  
  async execute(client, interaction) {
    
    db.delete(`basvurukanall_${interaction.guild.id}`)
    db.delete(`basvurulogg_${interaction.guild.id}`)
    db.delete(`basvururoll_${interaction.guild.id}`)
    
    const embed = new Discord.MessageEmbed()
    .setTitle("Sistem Kapatıldı!")
    .setDescription(`Kurmak için: /başvuru-kur`)
    .setTimestamp()
    interaction.reply({embeds: [embed]})
    
  }
}