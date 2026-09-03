const os = require("os")
const {MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js")
const moment = require("moment")
require('moment-duration-format')
module.exports = {
    slash: false,
    name: ['yardım', 'help'],
    description: 'Yardım Menüsü.',
    category: 'Info',
    option: [],
    
    async execute(client, interaction) {
   
      const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
        .setCustomId("infoselectmenu") 
        .setPlaceholder('Menüden Yardım Kategorisi Seç!')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label: "Genel",
            description: "Genel komutları gösterir",
            value: "genely",
            emoji: "🌐"
          },
          {
            label: "Eğlence",
            description: "Eğlence komutlarını gösterir",
            value: "eglencey",
            emoji: "🎮"
          },
          {
            label: "Logo",
            description: "Logo yapma komutlarını gösterir",
            value: "logoy",
            emoji: "🎨"
          },
          {
            label: "Gif",
            description: "Gif arama ve gönderme komutları",
            value: "gıfy",
            emoji: "🎬"
          },
          {
            label: "Moderasyon",
            description: "Yetkili ve yönetim komutları",
            value: "mody",
            emoji: "🛡️"
          },
          {
            label: "Sunucu",
            description: "Sunucu yönetim ve ayar komutları",
            value: "swy",
            emoji: "🏢"
          },
          {
            label: "Sahip",
            description: "Bot sahibine özel komutlar",
            value: "owy",
            emoji: "👑"
          },
          {
            label: "Kayıt Sistemi",
            description: "Kayıt sistemi komutları",
            value: "kayıty",
            emoji: "📝"
          },
          {
            label: "Abone Sistemi",
            description: "Abone rol ve onay sistemi komutları",
            value: "aby",
            emoji: "📺"
          },
          {
            label: "Resimli Doğrulama Sistemi",
            description: "Güvenlik ve captcha doğrulama komutları",
            value: "dsy",
            emoji: "🔒"
          },
          {
            label: "Partnerlik Sistemi",
            description: "Partnerlik sistemi komutları",
            value: "psy",
            emoji: "🤝"
          },
          {
            label: "Çekiliş Sistemi",
            description: "Çekiliş düzenleme komutları",
            value: "çsy",
            emoji: "🎉"
          },
          {
            label: "Bot List Sistemi",
            description: "Bot listesi ve başvuru komutları",
            value: "bsy",
            emoji: "🤖"
          },
          {
            label: "Yetkili Alım Sistemi",
            description: "Yetkili başvuru sistemi komutları",
            value: "ysy",
            emoji: "📋"
          },
          {
            label: "Seviye Sistemi",
            description: "Seviye ve rank komutları",
            value: "ssy",
            emoji: "📈"
          },
          {
            label: "Ekonomi Sistemi",
            description: "Ekonomi ve bakiye komutları",
            value: "eksy",
            emoji: "💰"
          }
        ])
        )
        const msg = await interaction.reply({ components: [row], fetchReply: true }).catch(console.error);
        if (!msg) return;

        const filter = i => i.customId === "infoselectmenu";
        const collector = msg.createMessageComponentCollector ? msg.createMessageComponentCollector({ filter, time: 120000 }) : null;

        const handleMenu = async (i) => {
          if (!i.isSelectMenu()) return;
          if (i.customId === "infoselectmenu") {
             
       if(i.values[0] === "genely") {
       const embed = new MessageEmbed()
       .setColor("#7e7e7e")
       .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
       .setTitle("Genel Yardım Menüsü")
       .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Genel').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
       await i.update({embeds: [embed]}).catch(() => {})
     }
          
      else if(i.values[0] === "eglencey") { 
      const embed1 = new MessageEmbed()
      .setTitle("Eğlence Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Eğlence').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed1]}).catch(() => {})
      
    } else if(i.values[0] === "logoy") { 
      const embed = new MessageEmbed()
      .setTitle("Logo Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Logo').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed]}).catch(() => {})
    } 
      else if(i.values[0] === "gıfy") { 
      const embed = new MessageEmbed()
      .setTitle("Gif Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Gif').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed]}).catch(() => {})
    } 
      else if(i.values[0] === "mody") { 
      const embed = new MessageEmbed()
      .setTitle("Moderasyon Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Moderasyon').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed]}).catch(() => {})
    }
      else if(i.values[0] === "swy") { 
      const embed = new MessageEmbed()
      .setTitle("Sunucu Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Sunucu').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed]}).catch(() => {})
    }
      else if(i.values[0] === "owy") { 
      const embed = new MessageEmbed()
      .setTitle("Sahip Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Sahip').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed]}).catch(() => {})
    }
      else if(i.values[0] === "kayıty") { 
      const embed = new MessageEmbed()
      .setTitle("Kayıt Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('**/kayıt-kur** Kayıt sistemini ayarlarsınız.\n' +
'**/kayıt-sıfırla** Kayıt sistemini sıfırlarsınız.\n' +
'**!kayıtsayı** Kayıt sayısı gösterir.\n' +
'**!e** Üyeyi erkek olarak kaydedersiniz.\n' +
'**!k** Üyeyi kız olarak kaydedersiniz.\n' +
'**!tag** Sunucunuzda ayarladığınız tagı gösterir.\n'+
'**!tagayarla** Sunucunuzda tag ayarlarsınız.\n'+
'**!tagsıfırla** Sunucunuzda tagı sıfırlarsınız.\n'+
'**!otoisimayarla** Sunucunuzda otomatik isim ayarlarsınız.\n'+
'**!otoisimsıfırla** Sunucunuzda otomatik ismi sıfırlarsınız.')
      await i.update({embeds:[embed]}).catch(() => {})
    }
      else if(i.values[0] === "aby") { 
      const embed1 = new MessageEmbed()
      .setTitle("Abone Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Abone').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed1]}).catch(() => {})
      
    }
      else if(i.values[0] === "dsy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Doğrulama Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('**/doğrulama-kur** Resimli Doğrulama Sistemi ayarlarsınız.\n' +
'**/doğrulama-sıfırla** Resimli Doğrulama Sistemini sıfırlarsınız.')
      await i.update({embeds:[embed1]}).catch(() => {})
      
    }
      else if(i.values[0] === "psy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Partnerlik Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Partner').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed1]}).catch(() => {})
      
    }
      else if(i.values[0] === "çsy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Çekiliş Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('**/çekiliş-başlat** Bir çekiliş başlatırsın. (Aynı anda en fazla 1 çekiliş ve 1 kazanan.)\n' +
'**/çekiliş-bitir** Bir çekiliş sonlandırırsın.\n' +
'**/çekiliş-yenile** Bir çekiliş yenilersin.')
      await i.update({embeds:[embed1]}).catch(() => {})
      
    }
      else if(i.values[0] === "bsy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Bot List Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('**/botlist-kur** Bot List sistemini kurarsınız.\n' + 
'**/botlist-kapat** Bot List sistemini kapatırsınız.')
      await i.update({embeds:[embed1]}).catch(() => {})
      
    }
      else if(i.values[0] === "ysy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Yetkili Alım Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('**/başvuru-kur** Yetkili Alım sistemini kurarsınız.\n' + 
'**/başvuru-kapat** Yetkili Alım sistemini kapatırsınız.\n' +
'**/başvur** Başvuru Yaparsınız')
      await i.update({embeds:[embed1]}).catch(() => {})
      
    }
    else if(i.values[0] === "ssy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Seviye Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Seviye').map(cmd => `<:Fingerguns1:990227791972827146> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed1]}).catch(() => {})
      
    }
    else if(i.values[0] === "eksy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Ekonomi Sistemi Yardım Menüsü")
      .setThumbnail(`${i.member?.displayAvatarURL({dynamic: true}) || i.user.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Ekonomi').map(cmd => `**!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await i.update({embeds:[embed1]}).catch(() => {})
      
    }

          }
                  
        };

        if (collector) {
          collector.on("collect", handleMenu);
        } else {
          client.on("interactionCreate", handleMenu);
        }
    }
}