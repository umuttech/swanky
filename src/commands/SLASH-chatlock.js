const Discord = require("discord.js")

module.exports = {
    slash: true, //slash komut olup olmadığını yaz
    name: ['lock'],
    description: "Komutu kullancığınız kanalı kilitler.",
    async execute(client, interaction, args) {

          if (!interaction.member.permissions.has("MANAGE_CHANNELS"))
    return interaction.reply("Bu komutu kullanabilmek için __KANALLARI YÖNET__ iznine sahip olman gerekiyor.")
  
  let every = interaction.guild.roles.cache.find(r => r.name === "@everyone");
  interaction.channel.permissionOverwrites.create(every, {
    SEND_MESSAGES: false
  });

  interaction.reply("Sohbet kanalı ``Yazılamaz`` durumuna getirildi.");

    }
}