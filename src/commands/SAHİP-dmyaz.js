const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['dmyaz'],
    description: "Belirttiğin kişiye belirttiğin yazıyı özel mesaj olarak atar.",
    kategori: "Sahip",
    async execute(client, message, args) {

       if(message.author.id !== "606572330457497641") return message.reply(`<a:armors_iptal:990609550153486357> Sahibim sen değilsin dostum!`);
        var kisi =
    message.mentions.users.first() ||
    client.users.resolve(args[0]) ||
    client.users.cache.find(u => u.username === args[0]) ||
    client.users.cache.get(args[0]);

  if (!kisi)
    return message.channel.send("Lütfen mesaj atacağım kişiyi belirtiniz.");
  let mesaj = args.slice(1).join(" ");

  if (mesaj.length < 1)
    return message.reply("Yazmam için herhangi bir şey yazmalısın.");
  message.delete({ timeout: 60000});
  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  member.send(mesaj);

    }
}