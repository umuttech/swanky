const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['emojiekle'],
    description: "Belirttiğiniz emojiyi sunucuya ekler.",
    kategori: "Sunucu",
    async execute(client, message, args) {

          if (!message.member.permissions.has(`MANAGE_EMOJIS_AND_STICKERS`))
      return message.channel.send({ content: `Bu Komutu Kullanma İzniniz Yok! Gerekli İzin: **Emojileri Yönet**` })
    
    if (!message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return message.channel.send({ content: `Emoji Yüklemek İçin İznim Yok!` })
    
    const emoji = args[0];
    if (!emoji) return message.channel.send({ content: `Please Give Me A Emoji!` });

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      return message.channel.send({ content: ` Başarılı bir şekilde " <a:${customemoji.name}:${customemoji.id}> " isimli emoji suncuya **eklendi**!` });
    } else {
      let CheckEmoji = Discord.Util.parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send({ content: `Lütfen Bana Geçerli Bir Emoji Verin!` });
      message.channel.send(
        `Sunucuya Eklemeden Normal Emoji Kullanabilirsiniz!`
      );
    }

    }
}