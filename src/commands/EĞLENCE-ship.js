const Discord = require("discord.js")
const Canvas = require("canvas")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['ship'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "İki kullanıcı arasındaki sevgiyi ölçer.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
      const canvas = Canvas.createCanvas(600, 250)
      const ctx = canvas.getContext("2d")

      const kullanici = message.mentions.users.first()
      if(!kullanici) return message.reply({ content: `Lütfen bir kullanıcı belirt!` })

      const backround = await Canvas.loadImage("https://media.discordapp.net/attachments/978604364153364540/1041843474418385008/image.png")
      ctx.drawImage(backround, 0, 0, canvas.width, canvas.height)

      const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png'}))
      ctx.drawImage(avatar, 50, 25, 200, 200)

      const kullaniciavatar = await Canvas.loadImage(kullanici.displayAvatarURL({ format: 'png'}))
      ctx.drawImage(kullaniciavatar, 350, 25, 200, 200)

      const heart = await Canvas.loadImage("https://media.discordapp.net/attachments/978604364153364540/1041846656674574346/pngwing.com_2.png")
      const broken = await Canvas.loadImage("https://media.discordapp.net/attachments/978604364153364540/1041846689130094652/pngwing.com_1.png")
      const random = Math.floor(Math.random() * 100) * 1

      if(random >= 50) {
        ctx.drawImage(heart, 223, 60, 155, 155)
        const ımage = new Discord.MessageAttachment(canvas.toBuffer(), 'SwankyBotSHIP.png')
        message.channel.send({ content: `**${message.author.username}** ile **${kullanici.username}** arasındaki sevgi = **%${random}**`, files: [ımage] })
      } else {
        ctx.drawImage(broken, 245, 60, 110, 110)
        const ımage = new Discord.MessageAttachment(canvas.toBuffer(), 'SwankyBotSHIP.png')
        message.channel.send({ content: `**${message.author.username}** ile **${kullanici.username}** arasındaki sevgi = **%${random}**`, files: [ımage] })
      }

      
    }
}

/*
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
  if(!member) return message.reply("**Aranızdaki sevgiyi ölçmek istediğin kişiyi etiketle!**")
  if(member.user.bot) return message.reply("**Botlarla aşk Yaşayamassın, sakin Ol!**")
  if(member.id == message.author.id) return message.reply("**Kendin ile aşk yaşayamazsın, sakin ol!**")
  
  var anasonuc = Math.floor(Math.random() * 101);
  var kalp = "";
  var akalp = "";
  if (Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
    var c = 0; 
    for (var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
      kalp += "❤️";
      c++;
    }
    for (var x = c; x < 10; x++) { 
      akalp += `🖤`;
    }
  } else {
    var kalp = "🖤";
    var akalp = "🖤🖤🖤🖤🖤🖤🖤🖤🖤";
  }
  var yorum = "Evlenecek kadar sevgi var aranızda <3";
  if (anasonuc < 80) {
    var yorum = "Biraz daha uğraşırsan bu iş olacak :)";
  }
  if (anasonuc < 60) {
    var yorum = "Eh işte arada trip atıyor.";
  }
  if (anasonuc < 40) {
    var yorum = "Az da olsa bir şeyler hissediyor sana :)";
  }
  if (anasonuc < 20) {
    var yorum = "Bu iş olmaz sen bunu unut.";
  }

  const embed = new Discord.MessageEmbed()
    .setAuthor({ name: `${message.author.tag} ve ${member.user.tag} Arasındaki Sevgi Sonucu.` })
    .setDescription(`Aranızdaki Sevgi Yüzdesi: ${anasonuc}\n${kalp}${akalp}\n\n${yorum}`)
    .setColor("RANDOM")
    .setTimestamp()
  message.channel.send({embeds: [embed]});
*/