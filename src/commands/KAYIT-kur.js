const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
module.exports = {
    slash: true,
    name: ['kayıt-kur'], 
    kategori: "Kayıt",
    description: 'Kayıt sistemini ayarlarsınız.', 
    option: [
        {   
            name: 'erkek', 
            description: 'Erkek üyeye verilecek rol.', 
            type: 'role',
            require: true
        },
       {   
            name: 'kız', 
            description: 'Kız üyeye verilecek rol.', 
            type: 'role',
            require: true
        },
       {   
            name: 'kayıtsız', 
            description: 'Kayıtsız üyeye verilecek rol.', 
            type: 'role',
            require: true
        },
       {   
            name: 'yetkili', 
            description: 'Kayıt yetkilisi rolü.', 
            type: 'role',
            require: true
        },
       {   
            name: 'giriş', 
            description: 'Giriş hoş geldin mesajının gönderileceği kanal.', 
            type: 'channel',
            require: true
        },
       {   
            name: 'sohbet', 
            description: 'Kayıt tamamlandıktan sonra hoş geldim mesajının gönderileceği kanal. (sohbet kanalı önerilir)', 
            type: 'channel',
            require: true
        },
       {   
            name: 'sembol', 
            description: 'İsim ve yaş arasına koyulacak sembol.', 
            type: 'string',
            require: false
        },
       {   
            name: 'tag', 
            description: 'İsmin başına eklenecek tag.', 
            type: 'string',
            require: false
        }
    ],
    async execute(client, interaction) { 
      
if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `Bu komutu kullanabilmek için \`YÖNETİCİ\` yetkisine sahip olmalısın!`, ephemeral:true})
      
      
                   
                  
                   const buton = new Discord.MessageButton()
                    .setEmoji("⚙️")
                    .setLabel("Ayarlar")
                    .setStyle("SECONDARY")
                    .setCustomId("kayıtayarlar")
            
                  
                   const buton1 = new Discord.MessageButton()
                    .setEmoji("🗑️")
                    .setLabel("Sıfırla")
                    .setStyle("DANGER")
                    .setCustomId("kayıtkapat")
                    
      
        const basarili = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Kayıt Sistemi Ayarlandı!")
            .setDescription("Kayıt sistemi başarıyla ayarlandı! Sıfırlamak isterseniz: `/kayıt-sıfırla`")
            .setFooter({ text: "SwankyBot Bot Kayıt Sistemi", iconURL: client.user.avatarURL() })
        
         const row = new Discord.MessageActionRow().addComponents(buton).addComponents(buton1)
         
        interaction.reply({ embeds: [basarili], components: [row] })
      
const erkekrol = interaction.options.getRole("erkek")
const kızrol = interaction.options.getRole("kız")
const kayıtsızrol = interaction.options.getRole("kayıtsız")
const yetkilirol = interaction.options.getRole("yetkili")
const girişkanal = interaction.options.getChannel("giriş")
const hgkanal = interaction.options.getChannel("sohbet")
const sembol = interaction.options.getString("sembol")
const tag = interaction.options.getString("tag")

db.set(`erkekroll_${interaction.guild.id}`, erkekrol.id)
db.set(`kızroll_${interaction.guild.id}`, kızrol.id)
db.set(`kayıtsızroll_${interaction.guild.id}`, kayıtsızrol.id)
db.set(`yetkiliroll_${interaction.guild.id}`, yetkilirol.id)
db.set(`giriskanall_${interaction.guild.id}`, girişkanal.id)
db.set(`hgkanall_${interaction.guild.id}`, hgkanal.id)
db.set(`semboll_${interaction.guild.id}`, sembol)
db.set(`tagg_${interaction.guild.id}`,tag)

    },
};