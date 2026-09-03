const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['ban'],
    description: "Belirttiğiniz kullanıcıyı sunucudan yasaklar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {
      
      
        var guild = message.guild;
  var banlayan = message.author.tag;
  let banxx = message.guild.bans.fetch();
   var kisi = message.mentions.members.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]); 
     var sebeb = args.slice(1).join(" ");
    
    
     if (!message.member.permissions.has("BAN_MEMBERS")) {
        const yetkinyok = new Discord.MessageEmbed()
          .setDescription("**<a:armors_iptal:990609550153486357> Herhangi Bir Kişi Banlamak İçin `Üyeleri Engelle` İznine Sahip Olmalısın!**")
          .setColor("RED")
          return  message.channel.send({embeds: [yetkinyok]})
     }


       
      if(!kisi) {
    const embedbruh = new Discord.MessageEmbed()
    .setDescription("**<a:armors_iptal:990609550153486357> Belirttiğiniz Kişi Sunucuda Yok Veya Banlamak İçin Herhangi Bir Kişi Belirtmedin!**")
    .setColor("RED")
    return  message.channel.send({embeds: [embedbruh]})
            
  }
      
    if(!message.author.id !== message.guild.ownerId) {  
  if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) <= 1) {
    const rolsira = new Discord.MessageEmbed()
    .setDescription("**<a:armors_iptal:990609550153486357> Bu Kişi Rol Sıralamasında Senden Yüksekte Veya Eşit Bu Sebeple Onu Banlayamazsın!**")
    .setColor("RED")
    return  message.channel.send({embeds: [rolsira]})
     }
    }


     if(kisi.id == message.guild.ownerId) {
        const arkadaşownermış = new Discord.MessageEmbed()
   .setDescription("**<a:armors_iptal:990609550153486357> Bu Kişi Sunucu Sahibi Onu Banlayamazsın!**")
   .setColor("RED")
   return  message.channel.send({embeds: [arkadaşownermış]})
      }
                    
          if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
       const yetkimyok = new Discord.MessageEmbed()
       .setDescription("**<a:armors_iptal:990609550153486357> Herhangi Bir Kişi Banlamak İçin `Üyeleri Engelle` İznine Sahip Olmalıyım!**")
       .setColor("RED")
       return  message.channel.send({embeds: [yetkimyok]})
     }
          
      
          if(!kisi.bannable) {
      const notbannable = new Discord.MessageEmbed()
 .setDescription("**<a:armors_iptal:990609550153486357> Bu Kişiyi Banlayamam!**")
 .setColor("RED")
 return  message.channel.send({embeds: [notbannable]})
    }

          
          
         var now = new Date()
 var sebepp = null
 
 if(!sebeb) {
   sebepp = "Sebep Belirtilmemiş."
 }    
 if(sebeb) {
   sebepp = sebeb
 }   
         try {
           const sucembeddm = new Discord.MessageEmbed()
           .setDescription(`${kisi} **${guild}** Adlı Sunucudan Banlandın.` + "\r\n" + `**Sebep: ${sebepp}**`)
           .setColor("RED")
          kisi.send(sucembeddm)
           const sucembed = new Discord.MessageEmbed()
           .setDescription(`<a:armors_onay1:990609433816092692> ${kisi} **Adlı Kullanıcı Banlandı.** \n**Sebep:** \`${sebepp}\``)
           .setColor("GREEN")
           message.channel.send({embeds: [sucembed]})
          return guild.members.ban(kisi, { reason: sebepp });
        } catch (error) {
          message.reply("**Bir Hata İle Karşılaşıldı Birkaç Dakika İçinde Tekrar Deneyin Eğer Bu Sorununuza Çözüm Olmadıysa Bir Geliştirici Veya Yetkiliye Bildirin!**")
          console.log(error)
        }  


    }
}