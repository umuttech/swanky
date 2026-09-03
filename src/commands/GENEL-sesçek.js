const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['çek'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Belirttiğiniz kişi ses kanalındaysa bulunduğunuz ses kanalına çeker.",
    kategori: "Genel",
    async execute(client, message, args) {
      
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("**Bu Komutu Kullanmaya Yetkin Yok!**");

  if (!message.member.voice.channel)
    return message.reply("**Bir Ses Kanalında Değilsin!**");
  
  let storm = message.mentions.members.first();
  if (!storm)
    return message.reply("**Yanına Kimin Gelmesini İstiyorsan Onu Etiketlemen Gerek!**");
  if (!storm.voice.channel)
    return message.reply("**Etiketlenen Kişi Bir Sesli Kanalda Değil!**");

  storm.voice.setChannel(message.member.voice.channelId);
  message.reply("**Belirttiğin Yanına Taşındı!**");
       
    }
}