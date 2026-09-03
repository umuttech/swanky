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
    if (msg.member.permissions.has("ADMINISTRATOR")) x = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("ADMINISTRATOR")) x = "<a:armors_iptal:990609550153486357> "
    
    //Denetim kaydı
    if (msg.member.permissions.has("VIEW_AUDIT_LOG")) x2 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("VIEW_AUDIT_LOG")) x2 = "<a:armors_iptal:990609550153486357> "
    
    //Sunucuyu yönet
    if (msg.member.permissions.has("MANAGE_GUILD")) x3 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("MANAGE_GUILD")) x3 = "<a:armors_iptal:990609550153486357> "
    
    //Rolleri yönet
    if (msg.member.permissions.has("MANAGE_ROLES")) x4 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("MANAGE_ROLES")) x4 = "<a:armors_iptal:990609550153486357> "
    
    //Kanalları yönet
    if (msg.member.permissions.has("MANAGE_CHANNELS")) x5 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("MANAGE_CHANNELS")) x5 = "<a:armors_iptal:990609550153486357> "
    
    //üyeleri at
    if (msg.member.permissions.has("KICK_MEMBERS")) x6 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("KICK_MEMBERS")) x6 = "<a:armors_iptal:990609550153486357> "
    
    //üyeleri yasakla
    if (msg.member.permissions.has("BAN_MEMBERS")) x7 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("BAN_MEMBERS")) x7 = "<a:armors_iptal:990609550153486357> "
    
    //mesajları yönet
    if (msg.member.permissions.has("MANAGE_MESSAGES")) x8 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("MANAGE_MESSAGES")) x8 = "<a:armors_iptal:990609550153486357> "
    
    //kullanıcı adlarını yönet
    if (msg.member.permissions.has("MANAGE_NICKNAMES")) x9 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("MANAGE_NICKNAMES")) x9 = "<a:armors_iptal:990609550153486357> "
    
    //emojileri yönet
    if (msg.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) x10 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) x10 = "<a:armors_iptal:990609550153486357> "
    
    //webhookları yönet
    if (msg.member.permissions.has("MANAGE_WEBHOOKS")) x11 = "<a:armors_onay1:990609433816092692>"
    if (!msg.member.permissions.has("MANAGE_WEBHOOKS")) x11 = "<a:armors_iptal:990609550153486357> "
     const embed = new Discord.MessageEmbed()
   .setTitle('Sunucudaki Yetkilerin')
  .setColor('GREEN')
  .setFooter('Bu komutu kullanan kullanıcı ' + msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(` ${x} Yönetici \n${x2} Denetim Kaydını Görüntüle \n${x3} Sunucuyu Yönet \n${x4} Rolleri Yönet \n${x5} Kanalları Yönet \n${x6} Üyeleri At \n${x7} Üyeleri Yasakla \n${x8} Mesajları Yönet \n${x9} Kullanıcı Adlarını Yönet \n${x10} Emojileri Yönet \n${x11} Webhook'ları Yönet`);
 msg.channel.send({embeds: [embed]});;


    }
}