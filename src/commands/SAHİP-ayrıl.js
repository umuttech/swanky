const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['ayrıl'],
    description: "Bot sunucudan ayrılır",
    kategori: "Sahip",
    async execute(client, message, args) {

       if (message.author.id !== "606572330457497641") return message.reply('<a:armors_iptal:990609550153486357> Sahibim Sen Değilsin');
   message.channel.send('<a:armors_onay:990226710924521502> Istediğin Sunucudan Ayrılıyorum Sahibim!');
   message.guild.leave()

    }
}