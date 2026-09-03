const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
module.exports = {
    slash: false,
    name: ['kayıtsayı'], 
    description: 'Kayıt sayısı gösterir.', 
    kategori: "Kayıt",
    option: [],
    async execute(client, message, args) { 
if (!message.member.roles.cache.get(db.get(`yetkiliroll_${message.guild.id}`)) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({content: `Bu komutu kullanabilmek için <@&${db.get(`yetkiliroll_${message.guild.id}`)}> rolüne veya \`YÖNETİCİ\` sahip olmalısın!`})
      
    const üye = message.member || client.users.cache.get(args[0]);
      
      const erkekkayıt = db.get(`erkekkayıtt_${message.guild.id}_${message.guild.members.cache.get(üye.id).id}`) || "0"
      const kızkayıt = db.get(`kızkayıtt_${message.guild.id}_${message.guild.members.cache.get(üye.id).id}`) || "0"
      const toplamkayıt = db.get(`toplamkayıtt_${message.guild.id}_${message.guild.members.cache.get(üye.id).id}`) || "0"
      
      
const kayıtsayı = new MessageEmbed()
.setTitle("Kayıt Sayı")
.setThumbnail(message.member.displayAvatarURL({ size: 512}))
.setDescription(`> Toplam Kayıt: **${toplamkayıt}**

> <:armors_erkek_uye:998258145057046618> Erkek Kayıt: **${erkekkayıt}**
> <:armors_bayan_uye:998258256055115863> Kız Kayıt: **${kızkayıt}**`)
.setFooter(`Kayıt Sistemi - Kayıt Sayı`, client.user.avatarURL())
.setTimestamp()
      
message.reply({ embeds: [kayıtsayı]}); 
    },
}; 