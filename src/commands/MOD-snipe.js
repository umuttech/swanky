const Discord = require("discord.js")
const db = require('inflames.db');
const moment = require("moment");
require('moment-duration-format');

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['snipe'],
    description: "Son silinen mesajı gösterir.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

      let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`)

if(!mesaj) return message.reply({ content: "Son Silinen mesaj bulunamadı." }) 
let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);

const embed = new Discord.MessageEmbed()
            return message.reply({ embeds: [embed.setDescription(`
        Mesaj sahibi: ${mesajYazari ? mesajYazari : mesajYazari.tag} ( \`${mesajYazari.id}\` )
        Mesajın silinme tarihi: \`${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce 
        
        Silinen Mesaj: \`${mesaj.dosya ? "Atılan mesaj bir dosya içeriyor." : mesaj.icerik}\`
        `)] });

    }
}