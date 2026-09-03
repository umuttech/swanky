const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['eval'],
    description: "Botta komut denersiniz.",
    kategori: "Sahip",
    async execute(client, message, args) {

          if(message.author.id !== "606572330457497641") return message.reply(`Sahibim sen değilsin dostum!`);
    if (args[0] === "client.token")
    return message.channel.send({content: `Tokenim: \nhttps://c.tenor.com/lC0BLIM9TOIAAAAC/recep-ivedik-nah.gif`});
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let çıkış = (`\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(çıkış)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }

    }
}