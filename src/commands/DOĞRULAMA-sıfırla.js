const {MessageEmbed} = require("discord.js");
const db = require("croxydb")
module.exports = { 
  slash: true,
  name: ['doğrulama-sıfırla'],
  description: "Resimli Doğrulama Sistemini sıfırlarsınız.",
  kategori: "Doğrulama",
  option:[],
  
   async execute(client, interaction, args) {

interaction.reply("Resimli Doğrulama Sistemi Başarıyla Sıfırlandı! Tekrar Kurmak İçin: `/doğrulama-kur`")
db.delete(`role_${interaction.guild.id}`)
db.delete(`kanal_${interaction.guild.id}`)
}
                 }