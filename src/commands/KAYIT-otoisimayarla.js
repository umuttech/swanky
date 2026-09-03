const Discord = require ("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
      slash: false,
      name: ['otoisimayarla'],
      kategori: "Kayıt",
      description: "Sunucunuzda oto isim ayarlarsınız.",
      option: [],
  
 async execute(client, message, args) {

    const otoisim = args.slice(0).join(' ');

    db.set(`otoisimm_${message.guild.id}`, otoisim)

message.reply({ content: `Otomatik İsim başarıyla \`${otoisim}\` olarak ayarlandı.`})

 }
}