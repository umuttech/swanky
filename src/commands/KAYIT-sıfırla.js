const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
    slash: true,
    name: ['kayıt-sıfırla'], 
    kategori: "Kayıt",
    description: 'Kayıt sistemini sıfırlarsınız.', 
    option: [],
    async execute(client, interaction) { 
if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `Bu komutu kullanabilmek için \`YÖNETİCİ\` yetkisine sahip olmalısın!`, ephemeral:true})
      
db.delete(`erkekroll_${interaction.guild.id}`)
db.delete(`kızroll_${interaction.guild.id}`)
db.delete(`kayıtsızroll_${interaction.guild.id}`)
db.delete(`yetkiliroll_${interaction.guild.id}`)
db.delete(`giriskanall_${interaction.guild.id}`)
db.delete(`hgkanall_${interaction.guild.id}`)
db.delete(`semboll_${interaction.guild.id}`)
db.delete(`tagg_${interaction.guild.id}`)
db.delete(`kızkayıtt_${interaction.guild.id}_${interaction.member.id}`)
db.delete(`erkekkayıtt_${interaction.guild.id}_${interaction.member.id}`)
db.delete(`toplamkayıtt_${interaction.guild.id}_${interaction.member.id}`)
      
interaction.reply({ content: "Kayıt Sistemi Ve Kayıt Sayıları Başarıyla Sıfırlandı! Tekrar Kurmak İçin: `/kayıt-kur`"}); 
    },
}; 