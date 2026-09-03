const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['seskanalaç'],
    description: "Belirttiğiniz isimde ses kanalı açar.",
    kategori: "Sunucu",
    async execute(client, message, args) {

          let kanal = args.slice(0).join(' ');
    let guild = message.guild;
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send(`<a:armors_iptal:990609550153486357> Bu komutu kullanabilmek için **KANALLARI YÖNET** iznine sahip olmalısın!`);
    if (kanal.length < 1) return message.reply('Lütfen oluşturacağım kanalın adını yaz.'); 
  message.delete();
  message.guild.channels.create(kanal,{ type: "GUILD_VOICE" });
  
  
  message.reply("Kanal oluşturuldu!");

    }
}