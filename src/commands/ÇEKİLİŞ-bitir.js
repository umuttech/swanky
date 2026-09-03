const { Client, MessageEmbed } = require("discord.js");
const db = require("croxydb")

module.exports = {
  slash: true,
  name: ['çekiliş-bitir'],
  description: "Bir çekilişi sonlandırırsın.",
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
    let data = db.fetch(`cekiliss_${key}`)
    if (!data) return interaction.reply("Böyle bir çekiliş bulunamadı!")
    let mesajs = data.mesajid
    let mesaj = await interaction.channel.messages.fetch(mesajs)
    let kullanici = db.fetch(`userr_${key}`)
    if (!kullanici) return interaction.reply("Yeterli katılımcı bulunamadı.")
    let kazanan = kullanici[
        Math.floor(Math.random() * kullanici.length)];
        let katılımcı = db.get(`userr_${key}`).length;       
        const embed = new MessageEmbed()
        .setTitle(data.odul)
       .setColor("AQUA")
        .setTimestamp()
      .setDescription(`
    ${data.acıklama}
      
    Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
    Düzenleyen: <@${data.hosted}>
    :reminder_ribbon: Kazanan: <@${kazanan}>
    Katılımcı: **${katılımcı}**`)
        mesaj.edit({embeds: [embed], components: []})
        interaction.reply({content: "Başarıyla çekiliş bitirildi.", ephemeral: true})
        db.set(`cekilis_${mesaj.id}`, data.odul);  
        db.delete(`cekilis_${interaction.channel.id}`);
        db.set(`son_${mesaj.id}`, true)
        interaction.channel.send("Tebrikler <@"+kazanan+">! Çekiliş Sonlandırıldı Ve **"+data+"** Kazandın!")
  }
}
