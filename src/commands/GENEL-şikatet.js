const Discord = require("discord.js")
const ayarlar = require("../base/settings.json")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['şikayet'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Şikatyette bulunursunuz.",
    kategori: "Genel",
    async execute(client, message, args) {
      
    let şikayetlog = ayarlar.sikayet
    let prefix = ayarlar.prefix
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.reply(`> **__Hatalı Kullanım...__**\n\n > **__Doğru Kullanım__** \n **\`${prefix}şikayet <şikayetiniz>\`**`);
      
message.reply({content: `Şikayetiniz / Talebiniz Bildirildi! En Kısa Sürede Geri Dönüş Yapılıcakatır.\nAnlayışınız İçin Teşekkürler`})

const embed = new Discord.MessageEmbed()
.addField(`**Kulanıcı Bilgileri**`, `> **__Kullanıcı ID:__** **\`${message.author.id}\`**\n> **__Kullanıcı Adı:__** **\`${message.author.username}\`**\n> **__Kullanıcı Tagı:__** **\`#${message.author.discriminator}\`**`)
.addField("Kullanıcı Şikayeti", type)
.setThumbnail(message.author.avatarURL)
 client.channels.cache.get(şikayetlog).send({content: `<@${message.author.id}> adlı kullanıcının __Şikayeti__` ,embeds:[embed]});
       
    }
}