const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['komutyenile'],
    description: "Belirttiğiniz komutu yeniden başlatır.",
    kategori: "Sahip",
    async execute(client, message, args) {

       if(message.author.id !== "606572330457497641") return message.reply(`<a:armors_iptal:990609550153486357> Sahibim sen değilsin dostum!`);
          var command = args[0];
    message.channel.send({ content: "`" + command + "` adlı komut yükleniyor..." })
      .then(m => {
        client.load(command)
          .then(() => {
            m.edit({ content: "`" + command + "` adlı komut başarıyla yüklendi." });
          })
          .catch(e => {
            m.edit({ content: `Komut yüklenirken bir hata oluştu: ${command}\n\`\`\`${e.stack}\`\`\`` });
          });
      });

    }
}