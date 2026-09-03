const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['unlock'],
    description: "Komutu kullandığınız kanalın kilidini açar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

          if (!message.member.permissions.has("MANAGE_CHANNELS"))
    return message.reply("Bu komutu kullanabilmek için __KANALLARI YÖNET__ iznine sahip olman gerekiyor.")
  
  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
  message.channel.permissionOverwrites.create(every, {
    SEND_MESSAGES: null
  });

  message.reply("Sohbet kanalı ``Yazılabilir`` durumuna getirildi.");

    }
}