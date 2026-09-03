const Discord = require("discord.js")
const db = require("croxydb")

module.exports = {
  slash: true,
  name: ['başvuru-kur'],
  description: "Yetkili Alım sistemi kurarsınız.",
  option: [
    {
      name: "kanal",
      description: "Onay / Red bildiri kanalı belirt.",
      type: 'channel',
      require: true
    },
    {
      name: "log",
      description: "Başvurunun gönderileceği Log kanalını belirt.",
      type: 'channel',
      require: true
    },
    {
      name: "rol",
      description: "Verilecek yetkili rolünü belirt.",
      type: 'role',
      require: true
    }
  ],
  
  async execute(client, interaction) {
    const kanal = interaction.options.getChannel('kanal')
    const log = interaction.options.getChannel('log')
    const rol = interaction.options.getRole('rol')
    
    db.set(`basvurukanall_${interaction.guild.id}`, kanal.id)
    db.set(`basvurulogg_${interaction.guild.id}`, log.id)
    db.set(`basvururoll_${interaction.guild.id}`, rol.id)
    
    const embed = new Discord.MessageEmbed()
    .setTitle("Kurulum başarılı!")
    .addField(`Bildirim Kanalı`, `<#${kanal.id}>`, true)
    .addField(`Başvuru Log`, `<#${log.id}>`, true)
    .addField(`Başvuru Rolü`, `<@&${rol.id}>`, true)
    .setFooter(`Kapatmak için: /başvuru-kapat`)
    .setTimestamp()
    interaction.reply({embeds: [embed]})
    
  }
}