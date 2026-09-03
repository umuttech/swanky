const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['forceban'],
    description: "ID'sini girdiğiniz kullanıcıyı sunucudan yasaklar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {

      if (!message.member.permissions.has("BAN_MEMBERS"))
    return message.channel.send("**<a:armors_iptal:990609550153486357> Hata: Bu komutu kullanabilmek için __ÜYELERİ YASAKLA__ iznine sahip olman gerekiyor.**")
                         let matheus_user = args[0];
  if(isNaN(matheus_user)) return message.reply("**<a:armors_iptal:990609550153486357> Hata: Doğru bir ID girmelisiniz.**")
  await message.guild.members.ban(matheus_user)
const embed = new Discord.MessageEmbed().setDescription(`<a:armors_onay1:990609433816092692> <@${matheus_user}> Adlı kullanıcı Sunucudan Yasaklandı!`);
  return message.channel.send({embeds:[embed]});

    }
}