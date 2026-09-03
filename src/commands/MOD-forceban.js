const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['forceban'],
    description: "ID'sini girdiğiniz kullanıcıyı sunucudan yasaklar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

      if (!message.member.permissions.has("BAN_MEMBERS"))
    return message.channel.send("**Hata: Bu komutu kullanabilmek için __ÜYELERİ YASAKLA__ iznine sahip olman gerekiyor.**")
                         let matheus_user = args[0];
  if(isNaN(matheus_user)) return message.reply("**Hata: Doğru bir ID girmelisiniz.**")
  await message.guild.members.ban(matheus_user)
const embed = new Discord.MessageEmbed().setDescription(`<@${matheus_user}> Adlı kullanıcı Sunucudan Yasaklandı!`);
  return message.channel.send({embeds:[embed]});

    }
}