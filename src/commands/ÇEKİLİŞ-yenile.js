const { Client, Discord } = require("discord.js");
const db = require("croxydb")

module.exports = {
  slash: true,
  name: ['çekiliş-yenile'],
  description: "Bir çekilişi yenilersin.",
  option: [
    {
        name:"mesaj",
        description:"Çekiliş mesaj ID 'si girin!",
        type:'string',
        require:true
    },
  ],
  async execute(client, interaction) {
    const key = interaction.options.getString('mesaj')
    let data = db.get(`cekiliss_${key}`)
    console.log(data)
    let mesajs = data.mesajid
    let sonaerdimi = db.fetch(`sonn_${key}`)
    if (!sonaerdimi) return interaction.reply("Bu çekiliş henüz sona ermemiş veya böyle bir çekiliş yok!")
    let kullanici = db.fetch(`userr_${key}`)
    if (!kullanici) return interaction.reply("Yeterli katılımcı bulunamadı.")
    let kazanan = kullanici[
        Math.floor(Math.random() * kullanici.length)];
        interaction.reply({content: "Çekiliş Başarıyla Yenilendi!", ephemeral: true})
        db.delete(`cekiliss_${interaction.channel.id}`);
        interaction.channel.send("<a:armors_konfeti:990610008632860742> Tebrikler <@"+kazanan+">! Çekiliş Yenilendi Ve **"+data+"** Kazandın!")

  }
}
