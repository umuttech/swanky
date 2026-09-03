const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['herkeserolver'],
    description: "Belirttiğiniz rolü sunucudaki tüm üyelere verir.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için \`YÖNETİCİ\` yetkisine sahip olman gerekiyor!`);

    if (message.mentions.roles.first === undefined) return message.reply("Herkese Vereceğim Rolü Etiektlemelisin!");

    let rol = message.mentions.roles.first();
    message.guild.members.cache.forEach(üyeler => üyeler.roles.add(rol));
    message.reply(`Başarıyla Herkese ${rol} Rolü Verildi! \n(Olmaz ise rol etiketlememişsindir)`);


    }
}