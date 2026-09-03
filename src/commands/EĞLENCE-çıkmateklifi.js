const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['çıkmateklifi'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Belirttiğiniz kişiye çıkma eklifi edersiniz.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
    let teamtr = message.mentions.users.first();
    if (!teamtr) return message.channel.send('**Çıkma Teklif Edeceğin Kişiyi Seçsene :D **');
    let dm = args.slice(1).join(' ');
    const dmat = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle('Biri Sana Çıkma Teklifi Etti! ')
    .addField('Ne Cevap Vereceksin Ben de Merak Ettim :D', `Dostum Kabul Et Bence`)
    .addField('Teklif Eden Kişi :', `➽ ${message.author.username}`)
    .setFooter('Çıkma Teklifi')
    teamtr.send({embeds:[dmat]});;
    const dmtamam = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle(`Çıkma Teklifi Ettin! DM'den Ona Yazdım`)
    .setFooter('Çıkma Teklifi Ettin!')
    message.channel.send({embeds:[dmtamam]});
      
    }
}