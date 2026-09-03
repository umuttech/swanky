const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['embedliyaz'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Bota emnbedli mesaj yazdırırsınız.",
    kategori: "genel",
    async execute(client, message, args) {
      
          let mesaj = args.slice(0).join(' ');
    if (!mesaj) return message.reply(new Discord.MessageEmbed().setDescription(`<@${message.author.id}> Bana Birşeyler Yazdırmalısın`));
    message.delete();
    const embed = new Discord.MessageEmbed()
    .setColor(0xD97634)
    .setDescription(`${mesaj}`)
    return  message.channel.send({embeds: [embed]});
       
    }
}