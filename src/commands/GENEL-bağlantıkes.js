const Discord = require("discord.js"); //V13
const client = new Discord.Client({intents: 98303})

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['sestenat'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Belirttiğinizk işi eğer bir ses kanalındaysa o kanaldan atar.",
    kategori: "Genel",
    async execute(client, message, args) {
      
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.reply("**Bu Komutu Kullanmaya Yetkin Yok!**");

  let csm = message.mentions.members.first();
  if (!csm)
    return message.reply(
      "**Kimin bağlantısı kesilecek etiketle.**"
    );
  if (!csm.voice.channel)
    return message.reply("**Etiketlenen kişi bir sesli kanalda değil!**");

  csm.voice.kick();
  
  const embed2 = new Discord.MessageEmbed().setDescription("<@"+csm + "> İsimli Kişi <#"+csm.voice.channelID+"> İsimli Sesli Kanaldan Atıldı!");
  message.channel.send({embeds: [embed2]})
      
    }
}