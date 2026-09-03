const db = require("croxydb")
const Discord = require("discord.js")

module.exports = {
    slash: true,
    name: ['uptime-kur'],
    description: "Uptime sistemi kurarsın. (Sadece sahibim kullanabilir ve ARMORS'da geçerlidir)",
    option: [
        {
            name: "kanal",
            description: "Uptime sisteminin kullanılacağı kanalı ayarlarsınız.",
            type: 'channel',
            require: true,
        },
        {
            name: "rol",
            description: "Üyelerin ekstra 3 link ekleyebileceği rol.",
            type: 'role',
            require: true,
        },
    ],

    async execute(client, interaction) {

        const row1 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setEmoji("🗑️")
                    .setLabel("Sıfırla")
                    .setStyle("DANGER")
                    .setCustomId("sistemSıfırla")
            )

        const yetki = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        const kanal = interaction.options.getChannel('kanal')
        const rol = interaction.options.getRole('rol')

        const ayarlandi = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Başarıyla Ayarlandı!")
            .setDescription(`Uptime sistemi başarıyla ${kanal} olarak **ayarlandı**!`)

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [yetki], ephemeral: true })

        interaction.reply({ embeds: [ayarlandi], components: [row1], ephemeral: true })

        db.set(`uptimeSistemi_${interaction.guild.id}`, { kanal: kanal.id, rol: rol.id })
    }

};
