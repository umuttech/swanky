const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['kanalisimdeğiş'],
    description: "Belirttiğiniz kanalın ismini belirttiğiniz şekilde değiştirir.",
    kategori: "Sunucu",
    async execute(client, message, args) {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send(`<a:armors_iptal:990609550153486357>Bu komutu kullanabilmek için **KANALLARI YÖNET** iznine sahip olmalısın!`);
  
let kanal1 = args.slice(0).join(' ')
if(!kanal1) return message.reply('Kanalın yeni ismi ne olsun?')
  
client.channels.cache.get(message.channel.id).setName(kanal1)
message.reply("<a:armors_onay1:990609433816092692> Kanal ismi başarıyla değiştirildi.")
  

    }
}