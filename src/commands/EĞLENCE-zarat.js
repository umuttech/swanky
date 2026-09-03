const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['zarat'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Zar atarsınız.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
    const embed = new Discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setTitle('🎲 Zarın: ' + doMagicDiceVoodoo());
message.channel.send({embeds:[embed]});
   
  function doMagicDiceVoodoo() {
        var rand = ['1', '2', '3', '4', '5', '6'];

        return rand[Math.floor(Math.random()*rand.length)];
    }
    }
}