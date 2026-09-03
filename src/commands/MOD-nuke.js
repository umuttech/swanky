const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['nuke'],
    description: "Belirttiğiniz kanalı sıfırlar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

         if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Bu Komutu Kullanmak İçin `Kanalları Yönet` Yetkisine Sahip Olmalısın!");
message.channel.clone().then(channel => {
    channel.setPosition(message.channel.position)
    channel.send(`<a:armors_onay:990226710924521502> Kanal Başarılı bir şekilde sıfırlandı.`)
    })
    message.channel.delete()
      

    }
}