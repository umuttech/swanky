const { MessageEmbed } = require("discord.js");
const config = require('../base/settings.json')

module.exports = {
   slash: false,
   name: ['linkler'],
   description: "Botun linklerini gösterir.",
   kategori: "Genel",
  
  async execute(client, message, args) {
    const topgg = config.topgg
    const davet = config.botdavet
    const destek = config.desteksunucusu
    const web = config.website

  const embed = new MessageEmbed()
.setTitle("<:armors_kanat1:998285655840919723> SwankyBot Bağlantılar <:armors_kanat2:998285898766635129> ")
.setDescription(`**[Beni Sunucuna Ekle](${davet})**
**[Destek Sunucum](${destek})**
**[Bana Oy Ver](${topgg})**
**[Web Sitem](${web})**`)
.setColor("#7e7e7e")
message.channel.send({embeds: [embed]})

}
}