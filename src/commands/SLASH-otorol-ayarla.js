const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
module.exports = {
    slash: true,
    name: ['otorol-ayarla'], 
    description: 'otorol ayarlarsınız.', 
    option: [
        {   
            name: 'rol', 
            description: 'Sunucuya gelene verilecek rol.', 
            type: 'role',
            require: true
        },
       {   
            name: 'kanal', 
            description: 'Oto rol mesajının gönderileceği kanal.', 
            type: 'channel',
            require: true
        }
    ],
    async execute(client, interaction) { 
if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `Bu komutu kullanabilmek için \`YÖNETİCİ\` yetkisine sahip olmalısın!`})
      
const role = interaction.options.getRole("rol");
const channel = interaction.options.getChannel("kanal")

db.set(`otorol_${interaction.guild.id}`, role.id);
db.set(`otorolkanal_${interaction.guild.id}`, channel.id)
      
const embed = new MessageEmbed()
.setTitle("OtoRol Kurulumu Başarılı!")
.setColor("GREEN")
.setDescription(`OtoRol Başarıyla ${role.toString()} Olarak Ayarlandı!
OtoRol Mesajının Gönderileceği Kanal <#${channel.id}> Olarak Ayarlandı!`)
.setFooter(client.user.username , client.user.avatarURL())
.setTimestamp()
      
      
interaction.reply({ embeds: [embed]}); 
    },
};