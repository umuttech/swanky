const Discord = require("discord.js")
const database = require("croxydb");

module.exports = {
    slash: true,
    name: ['botlist-kur'],
    description: "Bot List sistemini kurarsınız.",
    option: [
        {
            name: "botlist-log",
            description: "Botlist log kanalı belirt!",
            type: 'channel',
            require: true,
        },

        {
            name: "bot-rolü",
            description: "Botlara verilecek rolü belirt!",
            type: 'role',
            require: true
        },

        {
            name: "developer-rolü",
            description: "Botunu ekleyen kişilere verilecek rolü belirt!",
            type: 'role',
            require: true
        },

        {
            name: "yetkili-rolü",
            description: "Sunucunuza bot ekleyecek yetkili rolü belirt!",
            type: 'role',
            require: true,
        },

        {
            name: "onay-kanalı",
            description: "Botlist log kanalı belirt!",
            type: 'channel',
            require: true,
        },

        {
            name: "botekle-kanalı",
            description: "Botların eklenebileceği kanalı belirt!",
            type: 'channel',
            require: true,
        },

        {
            name: "ayrıldı-log",
            description: "Sunucu sahipleri çıktığında atılacak mesajın log kanalını ayarlarsınız!",
            type: 'channel',
            require: true,
        }

    ],
    async execute(client, interaction) {

        const yetki = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [yetki], ephemeral: true })

        const row1 = new Discord.MessageActionRow()

            .addComponents(
                new Discord.MessageButton()
                    .setEmoji("⚙️")
                    .setLabel("Ayarlar")
                    .setStyle("SECONDARY")
                    .setCustomId("ayarlar")
            )

            .addComponents(
                new Discord.MessageButton()
                    .setEmoji("🗑️")
                    .setLabel("Sıfırla")
                    .setStyle("DANGER")
                    .setCustomId("kapat")
            )

        const basarili = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Başarıyla Ayarlandı!")
            .setDescription("Botlist sistemi başarıyla ayarlandı! Sıfırlamak isterseniz: `/botlist-sıfırla`")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })
        interaction.reply({ embeds: [basarili], components: [row1] })

        const log = interaction.options.getChannel('botlist-log')
        const botRol = interaction.options.getRole('bot-rolü')
        const devRol = interaction.options.getRole('developer-rolü')
        const adminRol = interaction.options.getRole('yetkili-rolü')
        const onay = interaction.options.getChannel('onay-kanalı')
        const botekle = interaction.options.getChannel('botekle-kanalı')
        const ayrildiLog = interaction.options.getChannel('ayrıldı-log')

        database.set(`log_${interaction.guild.id}`, log.id)
        database.set(`botRol_${interaction.guild.id}`, botRol.id)
        database.set(`devRol_${interaction.guild.id}`, devRol.id)
        database.set(`adminRol_${interaction.guild.id}`, adminRol.id)
        database.set(`onay_${interaction.guild.id}`, onay.id)
        database.set(`botekle_${interaction.guild.id}`, botekle.id)
        database.set(`ayrildiLog_${interaction.guild.id}`, ayrildiLog.id)
    }
}