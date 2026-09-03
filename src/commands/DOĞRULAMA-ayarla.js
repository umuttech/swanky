const {MessageEmbed} = require("discord.js");
const db = require("croxydb")
module.exports = { 
  slash: true,
  name: ['doğrulama-kur'],
  description: "Resimli Doğrulama Sistemi ayarlarsınız.",
  kategori: "Doğrulama",
  option: [
    {
     name: "kanal",
     description: "Doğrulama Mesajının Gönderileceği Kanal.",
     type: "channel",
     require: true
    },
    {
     name: "rol",
     description: "Doğrulamadan Sonra Verilecek Rol.",
     type: "role",
     require: true
    }
  ],
  
  async execute(client, interaction, args) {

    const kanal = interaction.options.getChannel('kanal')
    const rol = interaction.options.getRole('rol')
    
    const embed = new MessageEmbed()
    .setTitle(`Doğrulama Sistemi Kurulumu`)
    .setThumbnail(interaction.member.displayAvatarURL({ size: 512}))
    .setDescription(`Birisi sunucuya giriş yaptığında bot, üyenin rol alabilmesi için belirttiğiniz kanala mesaj atacak ve doğrulamadan sonra rolü verecek.`)
    .addField(`Doğrulama Mesajı Kanalı`, `<#${kanal.id}>`,true)
    .addField(`Doğrulamada Verilecek Rol`, `<@&${rol.id}>`,true)
    .setFooter(client.user.username + " Doğrulama Sistemi", client.user.avatarURL())
    .setTimestamp()
    
interaction.reply({ embeds: [embed]})
db.set(`kanal_${interaction.guild.id}`, kanal.id)
db.set(`role_${interaction.guild.id}`, rol.id)
}
              }