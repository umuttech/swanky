const Discord = require("discord.js")
const db = require('quick.db');
const moment = require('moment')

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['rolver'],
    description: "Belirttiğiniz kişiye belirttiğiniz rolü verir.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

        if (!message.member.permissions.has("ADMINISTRATOR")){
    const dbt = new Discord.essageEmbed()
    .setColor("RED")
    .setDescription(`Bu komudu kullanabilmek için **Yönetci** yetkisine sahip olmalısın!`)
    .setTimestamp()
 
 
    return message.reply({embeds:[dbt]})
  }

 
 
    let member = message.mentions.members.first();
   let rol = message.mentions.roles.first()
    if(member.roles.cache.get(rol.id)) return message.channel.send("Kullanıcıda zaten bu rol var")

    if(!member) return message.channel.send({content:`Lütfen Bir Kullanıcı belirt`});
    if(!rol) return message.channel.send({content:`Lütfen Bir Rol belirt`});

    await member.roles.add(rol);
 let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let onaylanmatarih = `${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}`
    moment.locale("tr")
 
 
    const embed2 = new Discord.MessageEmbed()

  .setDescription(`${member} adlı kişiye başarıyla ${rol} rolü verildi!
 
  \`\`\`css
${onaylanmatarih}\`\`\`
  `)
  .setColor("GREEN")
  .setThumbnail(member.user.avatarURL({dynamic:true}))

    message.channel.send({embeds:[embed2]});

    }
}