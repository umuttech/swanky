const Discord = require ("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
      slash: false,
      name: ['k'],
      kategori: "Kayıt",
      description: "Üyeyi kız olarak kaydedersiniz.",
      option: [
        {
          name: "üye",
          description: "Kayıt edeceğin üyeyi belirt!",
          type : 'user',
          require: true
        },
        {
          name: "isim",
          description: "Üyenin ismini gir!",
          type: 'string',
          require: true
        },
        {
          name: "yaş",
          description: "Üyenin yaşını gir!",
          type: 'number',
          require: true
        }
      ],
 async execute(client, message, args) {
   if (!message.member.roles.cache.get(db.get(`yetkiliroll_${message.guild.id}`)) && !message.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `Bu komutu kullanabilmek için <@&${db.get(`yetkiliroll_${interaction.guild.id}`)}> rolüne veya \`YÖNETİCİ\` sahip olmalısın!`, ephemeral:true})
   
   const üye = message.mentions.users.first() || client.users.cache.get(args[0]);
   const isim = args[1];
   const yaş = args[2];
   const tag = db.get(`tagg_${message.guild.id}`) || "";
   const sembol = db.get(`semboll_${message.guild.id}`) || "";
   const kızrol = db.get(`kızroll_${message.guild.id}`);
   const kayıtsızrol = db.get(`kayıtsızroll_${message.guild.id}`);
   const hgkanal = db.get(`hgkanall_${message.guild.id}`);
   const kayıtsayı = db.get(`kızkayıtt_${message.guild.id}_${message.member.id}`) || "0";

   if (!üye) return message.reply({content: `Bir üye etiketle veya üye ID belirt.` });
   if (!isim) return message.reply({content: `Bir isim belirt.` });
   if (!yaş) return message.reply({content: `Bir yaş belirt.` });
   if (isNaN(yaş)) return message.reply({content: `Belirtilen yaş sadece sayılardan oluşmalıdır!` });
   
   db.add(`kızkkayıtt_${message.guild.id}_${message.member.id}`, 1)
   db.add(`toplamkayıtt_${message.guild.id}_${message.member.id}`, 1)
   
   
   message.guild.members.cache.get(üye.id).setNickname(`${tag} ${isim} ${sembol} ${yaş}`)
   message.guild.members.cache.get(üye.id).roles.add(kızrol)
   message.guild.members.cache.get(üye.id).roles.remove(kayıtsızrol)

   if(message.guild.members.cache.get(üye.id).roles.cache.get(kızrol))  {
    message.reply({ content: `Bu kullanıcı zaten kayıtlı. \`\`\`Bu nedenle kayıt sayında değişiklik olmayacak!\`\`\``})
    message.guild.members.cache.get(üye.id).setNickname(message.guild.members.cache.get(üye.id).displayName)
    db.add(`kızkayıtt_${message.guild.id}_${message.member.id}`, -1)
    db.add(`toplamkayıtt_${message.guild.id}_${message.member.id}`, -1)
  }
   
   const kızkayıt = new MessageEmbed()
   .setTitle("Kayıt Tamamlandı!")
   .setThumbnail(message.guild.members.cache.get(üye.id).displayAvatarURL())
   .setDescription(`> Kayıt Bilgileri
» Kayıt Edilen Üye: <@${message.guild.members.cache.get(üye.id).id}>
» Kaydı Gerçekleştiren Yetkili: <@${message.member.id}>
» Yeni İsmi: \`${tag} ${isim} ${sembol} ${yaş}\`
» Verilen Rol: <@&${kızrol}>
» Kayıt Türü: \`Kız\``)
   .setFooter(`${message.member.user.tag}, Kız Kayıt Sayısı: ${kayıtsayı}`, message.member.user.avatarURL())
   .setTimestamp()
   
   message.reply({ embeds: [Kızkayıt]})

   
   const hgmesaj = new MessageEmbed()
   .setTitle(`Hoş Geldin!`)
   .setThumbnail(message.guild.members.cache.get(üye.id).displayAvatarURL())
   .setDescription(`<a:armors_giris:990227364367728700>  <@${message.guild.members.cache.get(üye.id).id}> sunucuya <@&${Kızrol}> rolü ile katıldı!`)
   .addField(`<a:armors_onay3:1010226775286100049> Kayıt işlemini yapan yetkili`, `<@${message.member.id}>`, true)
   .addField(`<a:armors_mutluu:990228733308833792> Sunucuya hoş geldin!`, `<@${message.guild.members.cache.get(üye.id).id}>`, true)
   .setFooter(client.user.username + ' Kayıt Sistemi - Kız', client.user.avatarURL())
   
   db.delete(`yenıuye_${message.guild.id}`)
   
   client.channels.cache.get(hgkanal).send({ content: `<@${üye.id}> aramıza katıldı! Hoş geldin diyelim!`, embeds: [hgmesaj]});
 }
}