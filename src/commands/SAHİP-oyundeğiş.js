const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['oyundeğiş'],
    description: "Botun oynuyor yazısını değiştirirsiniz.",
    kategori: "Sahip",
    async execute(client, message, args) {

       if(message.author.id !== "606572330457497641") return message.reply(`Sahibim sen değilsin dostum!`);
      const sayMessage = args.join(` `);
      client.user.setActivity(sayMessage);
      message.channel.send(`Oyun ismi **${sayMessage}** olarak değiştirildi `)

    }
}