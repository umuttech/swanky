const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['kick'],
    description: "Belirttiğiniz kullanıcıyı sunucudan atar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

              if (!message.member.permissions.has("KICK_MEMBERS")){
            const yetkiyok = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Bu komutu kullanmak için yeterli yetkiye sahip değilsin. \nGerekli yetki: \`Üyeleri At\`**`)
            .setColor('#ff0000')
            
            
            return message.reply({embeds:[yetkiyok]})
        }

        let kullanici = message.mentions.members.first();
        let sebep = args.slice(1).join(' ');

        if(!kullanici){
            const kullanicihata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Kicklenecek kişiyi etiketlemen gerekiyor.**`)
            .setColor('#ff0000')
            return message.channel.send({embeds:[kullanicihata]})
        }
        if(!sebep){
            const sebephata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Lütfen sebep belirt.**`)
            .setColor('#ff0000')
            return message.channel.send({embeds:[sebephata]})
        }

        if(kullanici && sebep){
            kullanici.kick()

            const kick =  new Discord.MessageEmbed()
            .setDescription(`${kullanici} Kullanıcısı ${message.author} Tarafından **${sebep}** Sebebiyle Sunucudan Atıldı, Umarım Aynı Davranışları Tekrar Yapmaz.`)
            .setAuthor(`${message.author.username} - Başarılı Kick`, message.author.avatarURL({dynamic: true}))
            .setColor('RANDOM');
            message.channel.send({embeds:[kick]})
        }

    }
}