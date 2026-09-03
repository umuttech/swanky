const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['tersyazı'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Yazdığın yazıyı ters çevrilmiş halde atar.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
  if (args.length < 1) {
    return message.reply('Doğru Kullanım **+tersyazı merhaba**')
  }
   
message.channel.send(args.join(' ').split('').reverse().join(''))
    }
}