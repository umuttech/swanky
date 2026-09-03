const Discord = require("discord.js")
const ayarlar = require('../base/settings.json');
const prefix = ayarlar.prefix

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['isimdeğiş'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Belirttiğiniz kullanıcının ismini değiştirir.",
    kategori: "Genel",
    async execute(client, message, args) {
      
      if (!message.member.permissions.has("MANAGE_NICKNAMES")) return message.reply({ content: `Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!` })
  let isim = args.slice(1).join(' ');
  let kullanici = message.mentions.users.first();
  if(!kullanici) return message.reply({ content: `Lütfen bir kullanıcı giriniz! \nDoğru Kullanım; \`${prefix}isimdeğiş @${client.user.username}#${client.user.discriminator} <isim>\`` })
  if(!isim) return message.reply({ content: `Lütfen bir kullanıcı adı giriniz! \nDoğru Kullanım; \`${prefix}isimdeğiş @${client.user.username}#${client.user.discriminator} <isim>\`` })
  if(isim.length > 32) return message.reply({ content: `Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!` })
  message.guild.members.cache.get(kullanici.id).setNickname(`${isim}`)
  message.channel.send({ content: `Başarılı bir şekilde \`${kullanici.username}\` adlı kişinin kullanıcı adı \`${isim}\` olarak değiştirildi.` })
       
    }
}