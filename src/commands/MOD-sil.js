const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['sil'],
    description: "Belirttiğiniz miktarda mesajı siler.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

       if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("<a:armors_iptal:990609550153486357> Yetersiz İzin Hatası. Bu Komut İçin Mesajları Yönet Yetkim Olması Gerekiyor");
  if (!args[0]) return message.channel.send("Silinecek mesajın miktarını yaz!");
  message.delete()
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`<a:armors_onay1:990609433816092692> \`${args[0]}\` tane mesaj silindi`).then((e) => setTimeout(() => { e.delete(); }, 10000));
  })

    }
}