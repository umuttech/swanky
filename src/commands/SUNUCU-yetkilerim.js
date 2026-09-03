const Discord = require("discord.js")

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['yetkilerim'],
    description: "Sunucudaki yetkilerinizi gösterir.",
    kategori: "Sunucu",
    async execute(client, msg, args) {

      let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;
    
    //yönetici
    if (msg.member.permissions.has("ADMINISTRATOR")) x = ""
    if (!msg.member.permissions.has("ADMINISTRATOR")) x = ""
    
    //Denetim kaydı
    if (msg.member.permissions.has("VIEW_AUDIT_LOG")) x2 = ""
    if (!msg.member.permissions.has("VIEW_AUDIT_LOG")) x2 = ""
    
    //Sunucuyu yönet
    if (msg.member.permissions.has("MANAGE_GUILD")) x3 = ""
    if (!msg.member.permissions.has("MANAGE_GUILD")) x3 = ""
    
    //Rolleri yönet
    if (msg.member.permissions.has("MANAGE_ROLES")) x4 = ""
    if (!msg.member.permissions.has("MANAGE_ROLES")) x4 = ""
    
    //Kanalları yönet
    if (msg.member.permissions.has("MANAGE_CHANNELS")) x5 = ""
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) x5 = ""
    
    //üyeleri at
    if (msg.member.permissions.has("KICK_MEMBERS")) x6 = ""
    if (!msg.member.permissions.has("KICK_MEMBERS")) x6 = ""
    
    //üyeleri yasakla
    if (msg.member.permissions.has("BAN_MEMBERS")) x7 = ""
    if (!msg.member.permissions.has("BAN_MEMBERS")) x7 = ""
    
    //mesajları yönet
    if (msg.member.permissions.has("MANAGE_MESSAGES")) x8 = ""
    if (!msg.member.permissions.has("MANAGE_MESSAGES")) x8 = ""
    
    //kullanıcı adlarını yönet
    if (msg.member.permissions.has("MANAGE_NICKNAMES")) x9 = ""
    if (!msg.member.permissions.has("MANAGE_NICKNAMES")) x9 = ""
    
    //emojileri yönet
    if (msg.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) x10 = ""
    if (!msg.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) x10 = ""
    
    //webhookları yönet
    if (msg.member.permissions.has("MANAGE_WEBHOOKS")) x11 = ""
    if (!msg.member.permissions.has("MANAGE_WEBHOOKS")) x11 = ""
     const embed = new Discord.MessageEmbed()
   .setTitle('Sunucudaki Yetkilerin')
  .setColor('GREEN')
  .setFooter('Bu komutu kullanan kullanıcı ' + msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(` ${x} Yönetici \n${x2} Denetim Kaydını Görüntüle \n${x3} Sunucuyu Yönet \n${x4} Rolleri Yönet \n${x5} Kanalları Yönet \n${x6} Üyeleri At \n${x7} Üyeleri Yasakla \n${x8} Mesajları Yönet \n${x9} Kullanıcı Adlarını Yönet \n${x10} Emojileri Yönet \n${x11} Webhook'ları Yönet`);
 msg.channel.send({embeds: [embed]});;


    }
}