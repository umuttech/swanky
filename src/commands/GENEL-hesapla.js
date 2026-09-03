const Discord = require('discord.js');
const math = require('math-expression-evaluator') 

module.exports = {
   slash: false,
   name: ['hesapla'],
   description: "Bir işlem yaparsınız.",
   kategori: "Genel",
   option: [],

   async execute(client, message, args) {
var soru = args.slice(0).join(' ');

if(!soru) return message.reply('Bir işlem belirtin. **Doğru Kullanım**: !hesapla <işlem>')
else {
let cevap;
try {
cevap = math.eval(soru)
} catch(err) {
return message.channel.send('Lütfen sadece bilinen tarzda işlem yapınız.')
}

const embed = new Discord.MessageEmbed()
.setColor("AQUA")
.setTitle('Hesaplama Sonucu')
.setDescription(`**Soru** \`\`\`${soru}\`\`\`\n**Cevap** \`\`\`${cevap}\`\`\``)
.setFooter({text: `Kullanıcı: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
return message.channel.send({embeds: [embed]})
}


}
}