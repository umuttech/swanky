const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
    slash: true,
    name: ['otorol-sıfırla'], 
    description: 'otorol sıfırlarsınız.', 
    option: [],
    async execute(client, interaction) { 
if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `Bu komutu kullanabilmek için \`YÖNETİCİ\` yetkisine sahip olmalısın!`})
      
db.delete(`otorol_${interaction.guild.id}`);
db.delete(`otorolkanal_${interaction.guild.id}`)
interaction.reply("Otorol Başarıyla Sıfırlandı!"); 
    },
}; 