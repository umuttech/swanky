const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['spoileryaz'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Bota spoilerli mesaj yazdırırsınız.",
    kategori: "Genel",
    async execute(client, message, args) {
      
          let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply({ content: 'Spoiler Yapcağım Yazıyı Yaz!' });
    message.delete();
  return message.channel.send("||" + `${mesaj}` + "||");
       
    }
}