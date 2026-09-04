const { MessageEmbed } = require("discord.js");
const db = require('inflames.db');
const moment = require("moment");
require('moment-duration-format');

module.exports = {
  slash: true,
  name: ['snipe'],
  description: 'Bu kanalda son silinen mesajı gösterir.',
  async execute(client, interaction) {
    const gid = interaction.guild.id;
    const cid = interaction.channel.id;
    const mesaj = db.get(`snipe.${gid}.${cid}`);

    if (!mesaj) {
      return interaction.reply({ content: "Bu kanalda son silinen bir mesaj bulunamadı.", ephemeral: true });
    }

    const mesajYazari = interaction.guild.members.cache.get(mesaj.yazar);
    const gecenZaman = moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]");

    const embed = new MessageEmbed()
      .setTitle("🎯 Son Silinen Mesaj (Snipe)")
      .setColor("#e74c3c")
      .addField("Mesaj Sahibi", mesajYazari ? `${mesajYazari} (\`${mesajYazari.id}\`)` : `<@${mesaj.yazar}>`, true)
      .addField("Silinme Zamanı", `\`${gecenZaman}\` önce`, true)
      .addField("İçerik", `\`\`\`${mesaj.dosya ? "Atılan mesaj bir dosya/ek içeriyordu." : (mesaj.icerik || "Boş mesaj")}\`\`\``, false)
      .setFooter({ text: "SwankyBot Snipe" })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  }
};
