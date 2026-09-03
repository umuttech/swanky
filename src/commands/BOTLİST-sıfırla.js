const Discord = require("discord.js")
const database = require("croxydb");

module.exports = {
    slash: true,
    name: ['botlist-kapat'],
    description: "Bot List sistemini kapatırsınız.",
    option: [],
    async execute(client, interaction) {

        const yetki = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [yetki], ephemeral: true })


      
      
      interaction.reply({ content: `Bot List Sistemi başarıyla sıfırlandı! Tekrar kurmak için: \`/botlist-kur\`` })
      
      
        database.delete(`log_${interaction.guild.id}`)
        database.delete(`botRol_${interaction.guild.id}`)
        database.delete(`devRol_${interaction.guild.id}`)
        database.delete(`adminRol_${interaction.guild.id}`)
        database.delete(`onay_${interaction.guild.id}`)
        database.delete(`botekle_${interaction.guild.id}`)
        database.delete(`ayrildiLog_${interaction.guild.id}`)
    }
}