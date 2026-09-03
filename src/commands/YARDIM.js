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
        await interaction.reply({ components: [row]})
        client.on("interactionCreate", async interaction => {
          if (!interaction.isSelectMenu()) return;
          if(interaction.customId === "infoselectmenu") {
             
       if(interaction.values[0] === "genely") {
       const embed = new MessageEmbed()
       .setColor("#7e7e7e")
       .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
       .setTitle("Genel Yardım Menüsü")
       .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Genel').map(cmd => `<a:armors_onay:990226710924521502> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
       await interaction.update({embeds: [embed]})
     }
          
      else if(interaction.values[0] === "eglencey") { 
      const embed1 = new MessageEmbed()
      .setTitle("Eğlence Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Eğlence').map(cmd => `<a:armors_mutluu:990228733308833792> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed1]})
      
    } else if(interaction.values[0] === "logoy") { 
      const embed = new MessageEmbed()
      .setTitle("Logo Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Logo').map(cmd => `<:armors_kalpp:998285227082387496> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed]})
    } 
      else if(interaction.values[0] === "gıfy") { 
      const embed = new MessageEmbed()
      .setTitle("Gif Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Gif').map(cmd => `<:armors_bicak:1014649900052529163> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed]})
    } 
      else if(interaction.values[0] === "mody") { 
      const embed = new MessageEmbed()
      .setTitle("Moderasyon Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Moderasyon').map(cmd => `<:armors_admin:992367683729363034> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed]})
    }
      else if(interaction.values[0] === "swy") { 
      const embed = new MessageEmbed()
      .setTitle("Sunucu Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Sunucu').map(cmd => `<a:armors_onay6:1010232143919718420> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed]})
    }
      else if(interaction.values[0] === "owy") { 
      const embed = new MessageEmbed()
      .setTitle("Sahip Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Sahip').map(cmd => `<a:armors_tacc:1014221717356412938> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed]})
    }
      else if(interaction.values[0] === "kayıty") { 
      const embed = new MessageEmbed()
      .setTitle("Kayıt Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('<:armors_book:994181553565466624> **/kayıt-kur** Kayıt sistemini ayarlarsınız.\n' +
'<:armors_book:994181553565466624> **/kayıt-sıfırla** Kayıt sistemini sıfırlarsınız.\n' +
'<:armors_book:994181553565466624> **!kayıtsayı** Kayıt sayısı gösterir.\n' +
'<:armors_book:994181553565466624> **!e** Üyeyi erkek olarak kaydedersiniz.\n' +
'<:armors_book:994181553565466624> **!k** Üyeyi kız olarak kaydedersiniz.\n' +
'<:armors_book:994181553565466624> **!tag** Sunucunuzda ayarladığınız tagı gösterir.\n'+
'<:armors_book:994181553565466624> **!tagayarla** Sunucunuzda tag ayarlarsınız.\n'+
'<:armors_book:994181553565466624> **!tagsıfırla** Sunucunuzda tagı sıfırlarsınız.\n'+
'<:armors_book:994181553565466624> **!otoisimayarla** Sunucunuzda otomatik isim ayarlarsınız.\n'+
'<:armors_book:994181553565466624> **!otoisimsıfırla** Sunucunuzda otomatik ismi sıfırlarsınız.')
      await interaction.update({embeds:[embed]})
    }
      else if(interaction.values[0] === "aby") { 
      const embed1 = new MessageEmbed()
      .setTitle("Abone Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Abone').map(cmd => `<a:armors_youtube:1025811222228111420> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed1]})
      
    }
      else if(interaction.values[0] === "dsy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Doğrulama Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('<:armors_guard:1009870782870065152> **/doğrulama-kur** Resimli Doğrulama Sistemi ayarlarsınız.\n' +
'<:armors_guard:1009870782870065152> **/doğrulama-sıfırla** Resimli Doğrulama Sistemini sıfırlarsınız.')
      await interaction.update({embeds:[embed1]})
      
    }
      else if(interaction.values[0] === "psy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Partnerlik Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Partner').map(cmd => `<:armors_dcpartner:1014193198182182912> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed1]})
      
    }
      else if(interaction.values[0] === "çsy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Çekiliş Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('<:armors_cekilis:1029113172625469500> **/çekiliş-başlat** Bir çekiliş başlatırsın. (Aynı anda en fazla 1 çekiliş ve 1 kazanan.)\n' +
'<:armors_cekilis:1029113172625469500> **/çekiliş-bitir** Bir çekiliş sonlandırırsın.\n' +
'<:armors_cekilis:1029113172625469500> **/çekiliş-yenile** Bir çekiliş yenilersin.')
      await interaction.update({embeds:[embed1]})
      
    }
      else if(interaction.values[0] === "bsy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Bot List Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('<:armors_bots:998263060433219645> **/botlist-kur** Bot List sistemini kurarsınız.\n' + 
'<:armors_bots:998263060433219645> **/botlist-kapat** Bot List sistemini kapatırsınız.')
      await interaction.update({embeds:[embed1]})
      
    }
      else if(interaction.values[0] === "ysy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Yetkili Alım Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription('<:armors_evet:999251486083129415> **/başvuru-kur** Yetkili Alım sistemini kurarsınız.\n' + 
'<:armors_evet:999251486083129415> **/başvuru-kapat** Yetkili Alım sistemini kapatırsınız.\n' +
'<:armors_evet:999251486083129415> **/başvur** Başvuru Yaparsınız')
      await interaction.update({embeds:[embed1]})
      
    }
    else if(interaction.values[0] === "ssy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Seviye Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Seviye').map(cmd => `<:Fingerguns1:990227791972827146> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed1]})
      
    }
    else if(interaction.values[0] === "eksy") { 
      const embed1 = new MessageEmbed()
      .setTitle("Ekonomi Sistemi Yardım Menüsü")
      .setThumbnail(`${interaction.member.displayAvatarURL({dynamic: true})}`)
      .setColor("#7e7e7e")
      .setDescription(`${client.commands.filter(cmd => cmd.kategori === 'Ekonomi').map(cmd => `<:armors_market:1036247425599422485> **!${cmd.name}** ${cmd.description}`).join("\n ")}`)
      await interaction.update({embeds:[embed1]})
      
    }

          }
                  
        }
                  )
    }
}