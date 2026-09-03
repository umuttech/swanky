const Discord = require("discord.js")
const db = require('quick.db');
const moment = require('moment')

module.exports = {
    slash: true, //slash komut olup olmadığını yaz
    name: ['rolal'],
    description: "Belirttiğiniz kişiden belirttiğiniz rolü alır.",
    option: [
         {
          name: "kullanıcı",
          description: "Rolü alınacak kullanıcıyı belirt!",
          type: 'user',
          require: true
         },
         {
          name: "rol",
          description: "Kullanıcıdan alınacak rolü belirt!",
          type: 'role',
          require: true
         }
    ],
    async execute(client, interaction, args) {

        if (!interaction.member.permissions.has("ADMINISTRATOR")){
    const dbt = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komudu kullanabilmek için **Yönetci** yetkisine sahip olmalısın!`)
    .setTimestamp()
 
 
    return interaction.reply({embeds:[dbt]})
  }

 
    let member = interaction.options.getMember('kullanıcı')
   let rol = interaction.options.getRole('rol')
  
        if(!member.roles.cache.get(rol.id)) return interaction.reply("Kullanıcının üzerinde alacağım bu rol yok!.")

    if(!member) return interaction.reply({content:`Lütfen Bir Kullanıcı belirt`});
    if(!rol) return interaction.reply({content:`Alınacak Bir Rol belirt`});

    await member.roles.remove(rol);
 let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let onaylanmatarih = `${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}`
    moment.locale("tr")
 
    const embed2 = new Discord.MessageEmbed()

  .setDescription(`${member} adlı kişiden ${rol} rolü alındı!
  
  \`\`\`css
${onaylanmatarih}\`\`\`
 `)
  .setColor("RED")
  .setThumbnail(member.user.avatarURL({dynamic:true}))

    interaction.reply({embeds:[embed2]});

    }
}