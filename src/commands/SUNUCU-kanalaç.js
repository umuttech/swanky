const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['kanalaç'],
    description: "Belirttiğiniz isimde yazı kanalı açar.",
    kategori: "Sunucu",
    async execute(client, message, args) {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send(`Bu komutu kullanabilmek için **KANALLARI YÖNET** iznine sahip olmalısın!`);

    let kanal = args.slice(0).join(' ')
    if (!kanal) return message.reply('Lütfen oluşturacağım kanalın adını yazın.')

  message.guild.channels.create(kanal,{type: 'text'})
  message.reply("Kanal başarıyla oluşturuldu.")

    }
}