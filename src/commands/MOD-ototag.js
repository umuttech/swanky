const Discord = require("discord.js");
const db = require("croxydb");

module.exports = {
    slash: false,
    name: ['ototag'],
    description: "Belirttiğiniz tagı suucuya girenlerin isminin başına ekler.",
    kategori: "Moderasyon",

   async execute(client, message, args) {

  if (!message.member.permissions.has("ADMINISTRATOR"))return message.reply("Bu Komutu Kullanabilmek için `YÖNETİCİ` Yetkisine Sahip Olman Gerek!");

  let mesaj = args.slice(0).join(" ")
  if (!mesaj) return message.channel.send(`Lütfen bir tag belirt!
Örnek: \`d!ototag ⩛\``);

  message.channel.send(`Oto Tag başarıyla \`${mesaj}\` olarak ayarlandı!`);
  db.set(`ototagg_${message.guild.id}`, mesaj);
}
}
