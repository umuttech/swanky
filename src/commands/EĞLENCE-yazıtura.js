const Discord = require("discord.js")
var hd = [
    "TURA",
    "YAZI"
];

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['yazıtura'],
    description: "Yazı tura oynarsınız",
    kategori: "Eğlence",
    async execute(client, message, args) {

      message.reply(" **Yazı mı Tura mı?** : " + (hd[Math.floor(Math.random() * hd.length)]));

    }
}