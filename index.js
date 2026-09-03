//botun main dosyası 
require("dotenv").config();

const Discord = require("discord.js"); //V13
const client = new Discord.Client({intents: 98303})
client.setMaxListeners(0);
require("./src/base/app.js")(client)
const ayarlar = require("./src/base/settings.json")

// ========== EXPRESS WEB SUNUCUSU (UPTIME) ========== \\
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Render/UptimeRobot için ping adresi
app.get('/', (req, res) => {
  res.send('Bot 7/24 aktif durumda!');
});

app.listen(port, () => {
  console.log(`Express sunucusu ${port} portunda çalışıyor.`);
});
// ==================================================== \\

// ========== ANTI CRASH (ÇÖKME ÖNLEYİCİ) ========== \\
process.on('unhandledRejection', (reason, promise) => {
    console.log('[Anti-Crash] Yakalanmamış Rejection:', reason?.message || reason);
});
process.on('uncaughtException', (err, origin) => {
    console.log('[Anti-Crash] Yakalanmamış Exception:', err?.message || err);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('[Anti-Crash] Exception Monitor:', err?.message || err);
});
// ================================================== \\





    client.on('ready', () => {
  
      var actvs = [
        `${ayarlar.prefix}yardım ${client.guilds.cache.size} sunucuyu`,
        `${ayarlar.prefix}help`,
        `${client.guilds.cache.size} Servers | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users`,
        `Yeniden Aranızdayım!`,
        `Yüksek Gecikme Uyarısı!`,
    ];
    
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'PLAYIpNG' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'PLAYING'});
    }, 15000);
  
    client.user.setStatus("idle");//"dnd" rahatsız emeyin, "idle" boşta, "online" çevrimiçi, "offline" çevrimdışı
  
      console.log ('_________________________________________');
      console.log (`Bot Ping           : ${client.ws.ping}ms`)
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`);
      console.log (`Komut Sayısı       : ${client.commands.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Tekrardan Kullanıma Hazır!`);
      console.log ('_________________________________________');
    
    })


// =================== ÖZEL KOMUTLAR =================== \\


// =========== ETİKET PREFİX ========== \\
const { MessageButton, MessageActionRow } = require('discord.js')
client.on("messageCreate",message=>{
  
  const embed2 = new Discord.MessageEmbed()
.setDescription('<a:armors_onay:990226710924521502> **Prefixim:** s!\n' +
'<a:armors_renkligalpler:994182567592984647> **s!yardım** & **/yardım** komutu ile de yardım menüsüne ve komutlara göz atabilirsin.\n' +
'<a:armors_transparent_developer:992362481244713002> **Sahibim:** ⩛ Storm#6110 - <@606572330457497641>')
.setColor("#7e7e7e")
.setFooter({ text: client.user.username, iconURL: client.user.avatarURL()})
  
           
const button = new MessageButton().setLabel('Davet Et').setStyle('LINK').setURL('https://discord.com/oauth2/authorize?client_id=899825163699355668&scope=bot&permissions=27648876671');
const button1 = new MessageButton().setLabel('Destek').setStyle('LINK').setURL('https://discord.gg/ADqjEQ8CqP')
const button2 = new MessageButton().setLabel('Oy Ver').setStyle('LINK').setURL('https://top.gg/tr/bot/899825163699355668/vote')

        const row = new MessageActionRow().addComponents(button).addComponents(button1).addComponents(button2)
      if(message.content==`<@899825163699355668>`) return message.channel.send({
           embeds:[embed2],
           components:[row],
       })
})

// ========== BOOST LOG ========== \\

client.on("guildMemberUpdate", (oldMember, newMember) => {
let boost = "991050120156033075"
let channel = client.channels.cache.get("1005836510941171752")
if(oldMember.roles.cache.has(boost)) {
if(!newMember.roles.cache.has(boost)) channel.send({ content: `<@${oldMember.id}> sunucuda boostunu çekti :/` })
} else {
if(newMember.roles.cache.has(boost)) channel.send({ content: `<@${oldMember.id}> sunucuya boost bastı <a:armors_renkligalpler:994182567592984647>` })
}
})


// ========== KENDİNİ SAĞIRLAŞTIRMA ========== \\

client.on('voiceStateUpdate', async (___, newState) => {
if (
newState.member.user.bot &&
newState.channelID &&
newState.member.user.id == client.user.id &&
!newState.selfDeaf
) {
newState.setSelfDeaf(true);
}
});


// ==================== ÖZEL KOMUTLAR SON ==================== \\






// ============================= HERKESE AÇIK KOMUTLAR ============================= \\


// ========== AFK SİSTEMİ ========== \\

const db = require("quick.db")

client.on("messageCreate" , message => {
  // Baş Tanımlar
  if(!message.guild) return;
  if(message.content.startsWith(ayarlar.prefix + 'afk')) return;

  // Let Tanımları & Data Veri Çekme İşlemleri
  let afk = message.mentions.users.first()
  let kisi = db.fetch(`kisiid_${message.author.id}`)

  // Eğer Afk Kişi Etiketlenirse Mesaj Atalım
  if(afk){
    // Let Tanımları
    let sebep = db.fetch(`strsebep_${afk.id}`)
    let kisi2 = db.fetch(`kisiid_${afk.id}`)

    if(message.content.includes(kisi2)){

      message.reply({ content: `Etiketlediğin kişi şu an **AFK!**
Sebep: \`${sebep}\`` });
    }
  }

  // Eğer Afk Kişi Mesaj Yazarsa Afk'lıktan Çıkaralım Ve Mesaj Atalım
  if(message.author.id === kisi){

    // Datadaki AFK Kullanıcı Verilerini Silelim
    db.delete(`strsebep_${message.author.id}`)
    db.delete(`kisiid_${message.author.id}`)


    // Bilgilendirme Mesajı Atalım

    message.reply({ content : `Hoş geldin! Artık **AFK** değilsin.` });
  }  
})


// ========== CAPS LOCK ENGEL ========== \\

client.on("messageCreate", async msg => {
  if (msg.channel.type === "DM") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if(!msg.guild) return;
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.members.first()) {
            msg.delete();
            return msg.reply({ content: `${msg.member}, Capslock Kapat Lütfen!`})
              
          }
        }
      }
    }
  }
});

// ========== HG - BB ========== \\

client.on('guildMemberAdd', async member => {
  let hdb = require("croxydb")
  let hgbb = hdb.get(`cshgbb.${member.guild.id}`)
  let sunucu =  member.guild.channels.cache.get(hgbb)
  
      var kurulus = (Date.now() - member.user.createdTimestamp);
    var zaman = moment.duration(kurulus).format("Y [Yıl], M [Ay], DD [Gün]");
    var zaman2 = moment.duration(kurulus).format("DD [Gün], HH [saat], mm [dakika], ss [saniye]");
    const date = moment(member.user.createdAt)
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    string = string.trim();
    const endAt = member.user.createdAt
    const gün = moment(new Date(endAt).toISOString()).format('DD')
    const ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "01").replace("02", "02").replace("03", "03").replace("04", "04").replace("05", "05").replace("06", "06").replace("07", "07").replace("08", "08").replace("09", "09").replace("10", "10").replace("11", "11").replace("12", "12")
    const yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    const saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    const kuruluş = `${gün}/${ay}/${yıl} ${saat}`;
    if (kurulus > 604800000);
  
        const mapping = {
   " ": " ",
   '0': '<a:armors_sifir:1010102593428660295>',
   '1': '<a:armors_bir:1010101970087981056>',
   '2': '<a:armors_iki:1010101995010535464>',
   '3': '<a:armors_uc:1010102363907952640>',
   '4': '<a:armors_dort:1010102421831294987>',
   '5': '<a:armors_bes:1010102445382316043>',
   '6': '<a:armors_alti:1010102494837346314>',
   '7': '<a:armors_yedi:1010102510884757605>',
   '8': '<a:armors_sekiz:1010102533848571955>',
   '9': '<a:armors_dokuz:1010102556493631578>'
}
  let üyesayısıı = `${member.guild.memberCount.toString()}`
     .split("")
     .map(c => mapping[c] || c)
     .join("")
  
if(hgbb){
if(sunucu){
  
  const embed = new Discord.MessageEmbed()
  
  sunucu.send({ content: `${member}`, embeds: [embed.setDescription(`<a:armors_elmas:998292641320009849> Aramıza Hoş Geldin ${member} <a:armors_giris:990227364367728700> 

<a:armors_elmas:998292641320009849> Seninle Beraber ${üyesayısıı} Kişi Olduk! <a:armors_renkligalpler:994182567592984647> 

<a:armors_elmas:998292641320009849> Hesabın Oluşturulma Tarihi: \`${kuruluş}\` <:armors_evet:999251486083129415>`)]});
}}
})

client.on('guildMemberRemove', async member => {
let cdb = require("croxydb")
  let hgbb = cdb.get(`cshgbb.${member.guild.id}`)
  let sunucu =  member.guild.channels.cache.get(hgbb)
  
          const mapping = {
   " ": " ",
   '0': '<a:armors_sifir:1010102593428660295>',
   '1': '<a:armors_bir:1010101970087981056>',
   '2': '<a:armors_iki:1010101995010535464>',
   '3': '<a:armors_uc:1010102363907952640>',
   '4': '<a:armors_dort:1010102421831294987>',
   '5': '<a:armors_bes:1010102445382316043>',
   '6': '<a:armors_alti:1010102494837346314>',
   '7': '<a:armors_yedi:1010102510884757605>',
   '8': '<a:armors_sekiz:1010102533848571955>',
   '9': '<a:armors_dokuz:1010102556493631578>'
}
  let üyesayısıı = `${member.guild.memberCount.toString()}`
     .split("")
     .map(c => mapping[c] || c)
     .join("")
  
if(hgbb){
if(sunucu){
  
  const embed = new Discord.MessageEmbed()
  
  sunucu.send({ content: `\`${member.user.tag}\``, embeds: [embed.setDescription(`<a:armors_kizgin:1014213437745795152> \`${member.user.tag}\` Aramozdan Ayrıldı <a:armors_cikis:990227252534972416> 

<a:armors_kizgin:1014213437745795152> Geriye ${üyesayısıı} Kişi Kaldık! <:armors_uzgunkedi:1014214186559082567>`)]});
}}
})


// ========== REKLAM ENGEL SİSTEMİ ========== \\

client.on("messageCreate", async message => {

const rdb = require("orio.db")

let uyarisayisi = await rdb.get(`reklamuyari_${message.author.id}`)
let reklamkick = await rdb.get(`reklamkick_${message.guild.id}`)

if (reklamkick == 'acik') {  if (!message.member.permissions.has("ADMINISTRATOR")){

const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",]

if (reklam.some(word => message.content.toLowerCase().includes(word))) {

message.delete()
rdb.add(`reklamuyari_${message.author.id}`, 1) //uyarı puanı ekleme

if (uyarisayisi == 1) {
let uyari = new Discord.MessageEmbed()
.setColor("Blue")
.setDescription(`<a:armors_iptal:990609550153486357> <@${message.author.id}> Reklam yapmaya devam edersen atılacaksın (1/3)`)
.setTimestamp()        
message.channel.send({embeds: [uyari] })                
}
          
if(uyarisayisi == 2) {
let uyari = new Discord.MessageEmbed()
.setColor("Blue")
.setDescription(`<a:armors_iptal:990609550153486357> <@${message.author.id}> Reklam yapmaya devam edersen atılacaksın (2/3)`)
.setTimestamp()        
message.channel.send({embeds:[uyari]})
}
          
if(uyarisayisi === 3) {
await message.member.kick({reason: "SwankyBot Reklam Engel Sistemi (Kick)"})

let uyari = new Discord.MessageEmbed()
.setColor("Blue")
.setDescription(`<a:armors_onay:990226710924521502> <@${message.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa yasaklanacak.`)
.setTimestamp()               
message.channel.send({embeds:[uyari]}) 
}
          
if(uyarisayisi > 4) {
await message.member.ban({reason: "SwankyBot Reklam Engel Sistemi (Ban)"})
rdb.delete(`reklamuyari_${message.author.id}`)

let uyari = new Discord.MessageEmbed()
.setColor("Blue")
.setDescription(`<a:armors_iptal:990609550153486357> <@${message.author.id}> kick yedikten sonra tekrar devam ettiği için yasaklandı.`)
.setTimestamp()
message.channel.send({embeds:[uyari]})
}}}}
})


// ========== SA - AS ========== \\

client.on("interactionCreate", async(interaction) => {
    if(interaction.isButton) {
 if(interaction.customId === "saason") {
if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content:"<a:armors_iptal:990609550153486357> Bunu yapabilmek için `MESAJLARI YÖNET` yetkisine sahip olman gerek", ephemeral: true})
db.set(`saas_${interaction.guild.id}`, "on")
  await interaction.update({content:"<a:armors_onay1:990609433816092692> Selam alma sistemi başarılı şekilde açıldı." , components: [],embeds:[]})

    } else if(interaction.customId === "saasoff") {
      if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content:"<a:armors_iptal:990609550153486357> Bunu yapabilmek için `MESAJLARI YÖNET` yetkisine sahip olman gerek" ,ephemeral: true })
db.delete(`saas_${interaction.guild.id}`)
  await interaction.update({content:"<a:armors_iptal:990609550153486357> Selam alma sistemi başarılı şekilde kapatıldı." , components: [],embeds:[]})

    }
    }
})

// ========== SA - AS - 2 ========== \\

client.on("messageCreate", async message => {
    const messages = [
            "Aleyküm selam dostum, hoş geldin."
        ];
        var sa = ["Selam", "selam", "Sa", "SA", "sa", "Sea", "sea", "SEA", "selamın aleyküm", "Selamın Aleyküm", "SELAMIN ALEYKÜm", "selamun aleyküm", "Selamun Aleyküm", "SELAMUN ALEYKÜM", "selam", "Selam", "s.a", "s.a.", "saa", "Saa", "seaa", "Seaa"]
    let OtoCevap = await db.fetch(`saas_${message.guild.id}`)
    
    if (OtoCevap === "on") {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
           let foundInText = false;

  for (var i in sa) {
      let as = sa[i].toLowerCase()
                if (sa.includes(message.content.toLowerCase())) {
                  foundInText = true
                }
    
            }
            if (foundInText)
        {
            message.reply({content:`${randomMessage}`})
      return
        }
  } else {
    
  }
})

// ========== SNİPE ========== \\

const dbss = require('inflames.db');


client.on('messageDelete', async message => {
    const snipe = {
        icerik: message.content,
        yazar: message.author.id,
        yazilmaTarihi: message.createdTimestamp,
        silinmeTarihi: Date.now(),
    }
     dbss.set(`snipe.${message.guild.id}.${message.channel.id}`, snipe)
})


// ========== Oto Rol ========== \\

client.on("guildMemberAdd", (member) => {
  if(!db.has(`otorol_${member.guild.id}`)) return;
  if(!client.guilds.cache.get(member.guild.id).roles.cache.get(db.get(`otorol_${member.guild.id}`))) return;
    var rol = db.get(`otorol_${member.guild.id}`)
    member.roles.add(rol)
    const kanal = db.get(`otorolkanal_${member.guild.id}`);
        client.channels.cache.get(kanal).send(`<a:armors_onay3:1010226775286100049>  \`${member.user.tag}\` **adlı kullanıcıya <@&${rol}> rolü başarıyla verildi.**`)
}
         )

// ========== Kayıt ========== \\

const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js")

client.on("guildMemberAdd", (member) => {
   if(!db.has(`kayıtsızroll_${member.guild.id}`)) return;
  if(!client.guilds.cache.get(member.guild.id).roles.cache.get(db.get(`kayıtsızroll_${member.guild.id}`))) return;
    const kanal = db.get(`giriskanall_${member.guild.id}`)
    const sembol = db.get(`semboll_${member.guild.id}`) || ""
    const tag = db.get(`tagg_${member.guild.id}`) || ""
    const yetkili = db.get(`yetkiliroll_${member.guild.id}`)
    const kayıtsızrol = db.get(`kayıtsızroll_${member.guild.id}`)
    db.set(`yenıuye_${member.guild.id}`, {uye: member.id})
    
    // Kuruluş \\
    
    var kurulus = (Date.now() - member.user.createdTimestamp);
    var zaman = moment.duration(kurulus).format("Y [Yıl], M [Ay], DD [Gün]");
    var zaman2 = moment.duration(kurulus).format("DD [Gün], HH [saat], mm [dakika], ss [saniye]");
    const date = moment(member.user.createdAt)
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    string = string.trim();
    const endAt = member.user.createdAt
    const gün = moment(new Date(endAt).toISOString()).format('DD')
    const ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    const yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    const saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    const kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
    if (kurulus > 604800000)
      // Kuruluş \\
        member.roles.add(kayıtsızrol);
        member.setNickname(`${tag} İsim ${sembol} Yaş`);
      
      const mapping = {
   " ": " ",
   '0': '<a:armors_sifir:1010102593428660295>',
   '1': '<a:armors_bir:1010101970087981056>',
   '2': '<a:armors_iki:1010101995010535464>',
   '3': '<a:armors_uc:1010102363907952640>',
   '4': '<a:armors_dort:1010102421831294987>',
   '5': '<a:armors_bes:1010102445382316043>',
   '6': '<a:armors_alti:1010102494837346314>',
   '7': '<a:armors_yedi:1010102510884757605>',
   '8': '<a:armors_sekiz:1010102533848571955>',
   '9': '<a:armors_dokuz:1010102556493631578>'
}
  let üyesayısı = `${member.guild.memberCount.toString()}`
     .split("")
     .map(c => mapping[c] || c)
     .join("")
  
  var kontrol;
if (kurulus < 1296000000) {
kontrol = `<a:armors_unlem:1010142831748329562>  \`Güvenilir Değil!\``
}
if (kurulus > 1296000000) kontrol = `<a:armors_onay6:1010232143919718420> \`Güvenilir!\``
      
const girismesaj = new MessageEmbed()
.setTitle(`Yeni Üye Aramıza Katıldı ${member.user.tag}`)
.setThumbnail(member.displayAvatarURL())
.setColor("#7e7e7e")
.setDescription(`<a:armors_mutluu:990228733308833792> **Sunucumuza hoş geldin ${member}**

<a:armors_renkligalpler:994182567592984647> **Seninle birlikte ${üyesayısı} kişi olduk!**

<a:armors_yukleme:990229887954587678> Kayıt olmak için yetkilileri beklemen yeterli olacaktır.

<a:armors_onay1:990609433816092692> Yetkililer aşağıdaki butonlardan kayıt yapabilir.

> <a:armors_saat:994660462140604416> Hesabın açılış zamanı: \`${kuruluş}\`
> <:armors_guard:1009870782870065152> Hesap güvenilirliği: ${kontrol}
`)


const erkekkayıtbuton = new MessageButton()
.setEmoji("👨")
.setLabel("Erkek Kayıt")
.setStyle("SUCCESS")
.setCustomId("erkek")

const kızkayıtbuton = new MessageButton()
.setEmoji("👩")
.setLabel("Kız Kayıt")
.setStyle("SUCCESS")
.setCustomId("kız")

const kayıtroww = new Discord.MessageActionRow().addComponents(erkekkayıtbuton).addComponents(kızkayıtbuton);

member.guild.channels.cache.get(kanal).send({content: `<@&${yetkili}>, ${member} Yeni Kullanıcı Aramıza Katıldı.`, embeds: [girismesaj], components: [kayıtroww]}).then(mesaj => {
  db.set(`yenıuye_${member.guild.id}`, { uye: member.id, mesajıd: mesaj.id });
});
    })

const erkekkayıtmodal = new Discord.Modal()
.setCustomId("erkekkayıtform")
.setTitle("Erkek Kayıt")
const erkekkayıt1 = new Discord.TextInputComponent()
.setCustomId('üyeisim')
.setLabel('Üyenin İsmi')
.setStyle("SHORT")
.setPlaceholder('Örnek: Umut')
.setRequired(true)
const erkekkayıt2 = new Discord.TextInputComponent()
.setCustomId('üyeyaş')
.setLabel('Üyenin Yaşı')
.setStyle("SHORT")
.setMinLength(1)
.setMaxLength(2)
.setPlaceholder('Örnek: 16 (Yaş olmadan da kayıt olur.)')
.setRequired(false)

const erkekkayıtrow1 = new MessageActionRow().addComponents(erkekkayıt1);
const erkekkayıtrow2 = new MessageActionRow().addComponents(erkekkayıt2);

erkekkayıtmodal.addComponents(erkekkayıtrow1, erkekkayıtrow2);

client.on('interactionCreate', async interaction => {
  
  if(interaction.customId === 'erkek') {
    const yetki = new Discord.MessageEmbed()
    .setDescription(`Bu butonu kullanabilmek için <@&${db.fetch(`yetkiliroll_${interaction.guild.id}`)}> rolüne ihtiyacın var!`)
    .setFooter({ text: "SwankyBot Kayıt Sistemi", iconURL: client.user.avatarURL() })
    .setColor("RED")
if (!interaction.member.roles.cache.has(db.fetch(`yetkiliroll_${interaction.guild.id}`))) return interaction.reply({ embeds: [yetki], ephemeral: true });

    await interaction.showModal(erkekkayıtmodal);
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'erkekkayıtform') {
    
    const kayıtdata = db.fetch(`yenıuye_${interaction.guild.id}`)
    
   const üye = kayıtdata.uye
   const isim = interaction.fields.getTextInputValue('üyeisim');
   const yaş = interaction.fields.getTextInputValue('üyeyaş') || "";
   const tag = db.get(`tagg_${interaction.guild.id}`) || "";
   const sembol = db.get(`semboll_${interaction.guild.id}`) || "";
   const erkekrol = db.get(`erkekroll_${interaction.guild.id}`)
   const kayıtsızrol = db.get(`kayıtsızroll_${interaction.guild.id}`);
   const hgkanal = db.get(`hgkanall_${interaction.guild.id}`);
   const kayıtsayı = db.get(`erkekkayıtt_${interaction.guild.id}_${interaction.member.id}`) || "0";
   
   db.add(`erkekkayıtt_${interaction.guild.id}_${interaction.member.id}`, 1)
   db.add(`toplamkayıtt_${interaction.guild.id}_${interaction.member.id}`, 1)
   
   
   interaction.guild.members.cache.get(üye).setNickname(`${tag} ${isim} ${sembol} ${yaş}`).catch(err => { });
   interaction.guild.members.cache.get(üye).roles.add(erkekrol).catch(err => { });
   interaction.guild.members.cache.get(üye).roles.remove(kayıtsızrol).catch(err => { });
   
   if(interaction.guild.members.cache.get(üye).roles.cache.get(erkekrol)) return interaction.reply({ content: `Bu kullanıcı zaten kayıtlı!`, ephemeral: true})
   if(!interaction.guild.members.cache.get(üye).roles.cache.get(kayıtsızrol)) return interaction.reply({ content: `Bu kullanıcı zaten kayıtlı!`, ephemeral: true })
   if(interaction.guild.members.cache.get(üye).roles.cache.get(erkekrol)) return interaction.guild.members.cache.get(üye).setNickname(üye.displayName)
   db.delete(`yenıuye_${interaction.guild.id}`)
   
   const erkekkayıt = new MessageEmbed()
   .setTitle("Kayıt Tamamlandı!")
   .setThumbnail(interaction.guild.members.cache.get(üye).displayAvatarURL())
   .setDescription(`> Kayıt Bilgileri
» Kayıt Edilen Üye: <@${interaction.guild.members.cache.get(üye).id}>
» Kaydı Gerçekleştiren Yetkili: <@${interaction.member.id}>
» Yeni İsmi: \`${tag} ${isim} ${sembol} ${yaş}\`
» Verilen Rol: <@&${erkekrol}>
» Kayıt Türü: \`Erkek\``)
   .setFooter(`${interaction.member.user.tag}, Erkek Kayıt Sayısı: ${kayıtsayı}`, interaction.member.user.avatarURL())
   .setTimestamp()
   
   interaction.reply({ embeds: [erkekkayıt]})
   interaction.editReply({content: `kayıt tamamlandı` })

   
   const hgmesaj = new MessageEmbed()
   .setTitle(`Hoş Geldin!`)
   .setThumbnail(interaction.guild.members.cache.get(üye).displayAvatarURL())
   .setDescription(`<a:armors_giris:990227364367728700>  <@${interaction.guild.members.cache.get(üye).id}> sunucuya <@&${erkekrol}> rolü ile katıldı!`)
   .addField(`<a:armors_onay3:1010226775286100049> Kayıt işlemini yapan yetkili`, `<@${interaction.member.id}>`, true)
   .addField(`<a:armors_mutluu:990228733308833792> Sunucuya hoş geldin!`, `<@${interaction.guild.members.cache.get(üye).id}>`, true)
   .setFooter(client.user.username + ' Kayıt Sistemi', client.user.avatarURL())
   
   
   client.channels.cache.get(hgkanal).send({ content: `<@${interaction.guild.members.cache.get(üye).id}> aramıza katıldı! Hoş geldin diyelim!`, embeds: [hgmesaj]});
    
  }
})

const kızkayıtmodal = new Discord.Modal()
.setCustomId("kızkayıtform")
.setTitle("Kız Kayıt")
const kızkayıt1 = new Discord.TextInputComponent()
.setCustomId('üyeisim')
.setLabel('Üyenin İsmi')
.setStyle("SHORT")
.setPlaceholder('Örnek: Seda')
.setRequired(true)
const kızkayıt2 = new Discord.TextInputComponent()
.setCustomId('üyeyaş')
.setLabel('Üyenin Yaşı')
.setStyle("SHORT")
.setMinLength(1)
.setMaxLength(2)
.setPlaceholder('Örnek: 16 (Yaş olmadan da kayıt olur.)')
.setRequired(false)

const kızkayıtrow1 = new MessageActionRow().addComponents(kızkayıt1);
const kızkayıtrow2 = new MessageActionRow().addComponents(kızkayıt2);

kızkayıtmodal.addComponents(kızkayıtrow1, kızkayıtrow2);

client.on('interactionCreate', async interaction => {
  
  if(interaction.customId === 'kız') {

    const yetki = new Discord.MessageEmbed()
    .setDescription(`Bu butonu kullanabilmek için <@&${db.fetch(`yetkiliroll_${interaction.guild.id}`)}> rolüne ihtiyacın var!`)
    .setFooter({ text: "SwankyBot Kayıt Sistemi", iconURL: client.user.avatarURL() })
    .setColor("RED")
if (!interaction.member.roles.cache.has(db.fetch(`yetkiliroll_${interaction.guild.id}`))) return interaction.reply({ embeds: [yetki], ephemeral: true });

    await interaction.showModal(kızkayıtmodal);
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'kızkayıtform') {
    
    const kayıtdata = db.fetch(`yenıuye_${interaction.guild.id}`)
    
   const üye = kayıtdata.uye
   const isim = interaction.fields.getTextInputValue('üyeisim');
   const yaş = interaction.fields.getTextInputValue('üyeyaş') || "";
   const tag = db.get(`tagg_${interaction.guild.id}`) || "";
   const sembol = db.get(`semboll_${interaction.guild.id}`) || "";
   const kızrol = db.get(`kızroll_${interaction.guild.id}`)
   const kayıtsızrol = db.get(`kayıtsızroll_${interaction.guild.id}`);
   const hgkanal = db.get(`hgkanall_${interaction.guild.id}`);
   const kayıtsayı = db.get(`kızkayıtt_${interaction.guild.id}_${interaction.member.id}`) || "0";
   
   db.add(`kızkayıtt_${interaction.guild.id}_${interaction.member.id}`, 1)
   db.add(`toplamkayıtt_${interaction.guild.id}_${interaction.member.id}`, 1)
   
   
   interaction.guild.members.cache.get(üye).setNickname(`${tag} ${isim} ${sembol} ${yaş}`).catch(err => { });
   interaction.guild.members.cache.get(üye).roles.add(kızrol).catch(err => { });
   interaction.guild.members.cache.get(üye).roles.remove(kayıtsızrol).catch(err => { });
   
   if(interaction.guild.members.cache.get(üye).roles.cache.get(kızrol)) return interaction.reply({ content: `Bu kullanıcı zaten kayıtlı!`, ephemeral: true})
   if(!interaction.guild.members.cache.get(üye).roles.cache.get(kayıtsızrol)) return interaction.reply({ content: `Bu kullanıcı zaten kayıtlı!`, ephemeral: true })
   if(interaction.guild.members.cache.get(üye).roles.cache.get(kızrol)) return interaction.guild.members.cache.get(üye).setNickname(üye.displayName)
   db.delete(`yenıuye_${interaction.guild.id}`)
   
   const erkekkayıt = new MessageEmbed()
   .setTitle("Kayıt Tamamlandı!")
   .setThumbnail(interaction.guild.members.cache.get(üye).displayAvatarURL())
   .setDescription(`> Kayıt Bilgileri
» Kayıt Edilen Üye: <@${interaction.guild.members.cache.get(üye).id}>
» Kaydı Gerçekleştiren Yetkili: <@${interaction.member.id}>
» Yeni İsmi: \`${tag} ${isim} ${sembol} ${yaş}\`
» Verilen Rol: <@&${kızrol}>
» Kayıt Türü: \`Kız\``)
   .setFooter(`${interaction.member.user.tag}, Kız Kayıt Sayısı: ${kayıtsayı}`, interaction.member.user.avatarURL())
   .setTimestamp()
   
   interaction.reply({ embeds: [erkekkayıt]})

   
   const hgmesaj = new MessageEmbed()
   .setTitle(`Hoş Geldin!`)
   .setThumbnail(interaction.guild.members.cache.get(üye).displayAvatarURL())
   .setDescription(`<a:armors_giris:990227364367728700>  <@${interaction.guild.members.cache.get(üye).id}> sunucuya <@&${kızrol}> rolü ile katıldı!`)
   .addField(`<a:armors_onay3:1010226775286100049> Kayıt işlemini yapan yetkili`, `<@${interaction.member.id}>`, true)
   .addField(`<a:armors_mutluu:990228733308833792> Sunucuya hoş geldin!`, `<@${interaction.guild.members.cache.get(üye).id}>`, true)
   .setFooter(client.user.username + ' Kayıt Sistemi', client.user.avatarURL())
   
   
   client.channels.cache.get(hgkanal).send({ content: `<@${interaction.guild.members.cache.get(üye).id}> aramıza katıldı! Hoş geldin diyelim!`, embeds: [hgmesaj]});
    
  }
})


client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "kayıtayarlar") {
let erkekrol = db.get(`erkekroll_${interaction.guild.id}`) || "Ayarlanmamış!"
let kızrol = db.get(`kızroll_${interaction.guild.id}`) || "Ayarlanmamış!"
let kayıtsızrol = db.get(`kayıtsızroll_${interaction.guild.id}`) || "Ayarlanmamış!"
let yetkilirol = db.get(`yetkiliroll_${interaction.guild.id}`, ) || "Ayarlanmamış!"
let girişkanal = db.get(`giriskanall_${interaction.guild.id}`) || "Ayarlanmamış!"
let hgkanal= db.get(`hgkanall_${interaction.guild.id}`) || "Ayarlanmamış!"
let sembol = db.get(`semboll_${interaction.guild.id}`) || "Ayarlanmamış"
let tag = db.get(`tagg_${interaction.guild.id}`) || "Ayarlanmamış"

      const mesaj = new Discord.MessageEmbed()
      .setTitle(`Kayıt Sistemi Ayarları`)
      .setThumbnail(interaction.member.displayAvatarURL({ size: 512}))
      .setColor("GREEN")
      .addField(`Erkek Rolü`, `<@&${erkekrol}>`, true)
      .addField(`Kız Rolü`, `<@&${kızrol}>`, true)
      .addField(`Kayıtsız Rolü`, `<@&${kayıtsızrol}>`, true)
      .addField(`Yetkili Rolü`, `<@&${yetkilirol}>`, true)
      .addField(`Giriş Mesajı Kanalı`, `<#${girişkanal}>`, true)
      .addField(`Hoş Geldin Mesajı Kanalı`, `<#${hgkanal}>`, true)
      .addField(`İsim Yaş Arası Sembol`, `${sembol}`, true)
      .addField(`Tag`, `${tag}`, true)
      .setFooter(`Kayıt Sistemini Sıfırlamak için: /kayıt-sıfırla`, client.user.avatarURL())
      

        const yetki = new Discord.MessageEmbed()
            .setDescription("Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
            .setFooter({ text: "SwankyBot Kayıt Sistemi", iconURL: client.user.avatarURL() })
            .setColor("RED")
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [yetki], ephemeral: true });

        interaction.reply({ embeds: [mesaj], ephemeral: true })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "kayıtkapat") {
        const yetkii = new Discord.MessageEmbed()
            .setDescription("Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
            .setFooter({ text: "SwankyBot Kayıt Sistemi", iconURL: client.user.avatarURL() })
            .setColor("RED")

        const embed1 = new Discord.MessageEmbed()
            .setDescription("Kayıt sistemi başarıyla **sıfırlandı**!")
            .setFooter({ text: "SwankyBot Kayıt Sistemi", iconURL: client.user.avatarURL() })
            .setColor("GREEN")

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [yetkii], ephemeral: true })

db.delete(`erkekroll_${interaction.guild.id}`)
db.delete(`kızroll_${interaction.guild.id}`)
db.delete(`kayıtsızroll_${interaction.guild.id}`)
db.delete(`yetkiliroll_${interaction.guild.id}`)
db.delete(`giriskanall_${interaction.guild.id}`)
db.delete(`hgkanall_${interaction.guild.id}`)
db.delete(`semboll_${interaction.guild.id}`)
db.delete(`tagg_${interaction.guild.id}`)
db.delete(`kızkayıtt_${interaction.guild.id}_${interaction.member.id}`)
db.delete(`erkekkayıtt_${interaction.guild.id}_${interaction.member.id}`)
db.delete(`toplamkayıtt_${interaction.guild.id}_${interaction.member.id}`)
        return interaction.reply({ content: "Kayıt sistemi başarıyla **sıfırlandı**!", ephemeral: true })
    }
})


// ========== Oto Cevap ========== \\

const odb = require("croxydb")
client.on("messageCreate", async message => {
  
  const cmd = odb.fetch(`otocevapp_${message.content}_${message.guild.id}`)
  if(!cmd) return;
  
  if(cmd) {
    message.channel.send({ content: `${cmd.answer}` })
  }
  
});


// ========== Oto Tag ========== \\

const tdb = require("croxydb")

client.on("guildMemberAdd", async member => {
  if(!tdb.has(`ototagg_${member.guild.id}`)) return;
  
  let ototag = tdb.get(`ototagg_${member.guild.id}`);;
  if (ototag) return member.setNickname(`${ototag} ${member.displayName}`)
});


// ========== Mesaj Log ========== \\

const qdb = require('croxydb')
client.on('messageDelete', async message => {  
  if(message.author.bot) return;
  let id = qdb.get(`log_${message.guild.id}`)
  let log = qdb.get(`log_${message.guild.id}`)
  if(!log) return;
  const channel = client.channels.cache.get(log);
  if(!channel) return;
  let silinen = new Discord.MessageEmbed()
                         .setAuthor({ name :  `${message.author.tag}`, iconURL : message.author.avatarURL()})    
                         .setThumbnail(message.author.avatarURL({ size:64}))
                         .addField(`${message.author.tag} adlı kullanıcının ${message.channel.name} kanalına gönderdiği bir mesaj silindi.`, `${message.content}`,)
                         .setFooter(`SwankyBot Mesaj Log`)
                         .setTimestamp()
                         .setColor("WHITE")
     
channel.send({embeds : [silinen]}).catch(err => {})
     });
     
client.on('messageUpdate', async(oldMessage, newMessage) => {
if(oldMessage.content == newMessage.content) return;
let log = qdb.get(`log_${oldMessage.guild.id}`)
if(!log) return;
const channel = oldMessage.guild.channels.cache.get(log);
if(!channel) return;
if(newMessage.author.bot) return;
         let güncel = new Discord.MessageEmbed()
         .setTitle(`Mesaj güncellendi!`)
         .setAuthor({ name : `${oldMessage.author.tag}`, iconURL : oldMessage.author.avatarURL()})
         .setThumbnail(oldMessage.author.avatarURL({ size: 64}))
         .addField(`Mesaj Sahibi`, `<@${oldMessage.author.id}>`)
         .addField("Eski mesaj", `${oldMessage.content}`, true)
         .addField(`Yeni Mesaj`, `${newMessage.content}`, true)
         .addField(`Kanal`, `${oldMessage.channel.name}`, true)
         .setFooter(`SwankyBot Mesaj Log`)
         .setTimestamp()
         .setColor("WHITE")
     
         channel.send({embeds : [güncel]}).catch(err => {})
     });

// ========== Resimli Captcha ========== \\

const cdb = require('croxydb')

client.on("guildMemberAdd", member => {
  let kanal = cdb.fetch(`kanal_${member.guild.id}`)
  if (!kanal) return;
  let mod = cdb.fetch(`rol_${member.guild.id}`)
  if (!mod) return;
const randomWord = ["7eA4q", "5fTc45", "fTrC87", "CFtq17", "bvPS0", "0fPt9R", "rtFwQA", "tsAw14", "vPf0rT9", "kDfHgS1", "s1w3dG"];
   const randomMessage = randomWord[Math.floor(Math.random() * randomWord.length)];
  var image = `https://dummyimage.com/1100x250/bdff67/161414&text=${randomMessage}`
  const embed = new Discord.MessageEmbed()
  .setTitle(`SwankyBot - Doğrulama`)
  .setDescription(`Aşağıdaki resimde bulunan yazyı **eksiksiz** yaz ve doğrulamayı tamamla!`)
  .setImage(image)
  .setFooter(`SwankyBot Doğrulama Sistemi`)
  .setTimestamp()
  .setColor("RED")
client.channels.cache.get(kanal).send({embeds: [embed], content: "<@"+member.id+">"})
cdb.set(`yazı_${member.id}`, randomMessage)
})
client.on("messageCreate", message => {
let yazı = cdb.fetch(`yazı_${message.author.id}`)
let mod = cdb.fetch(`rol_${message.guild.id}`)
if (!yazı) return;
if (message.content === yazı) {
message.react("<a:armors_onay1:990609433816092692>")
message.reply({ content: `Doğrulama Tamamlandı ve Rolün Verildi.` })
message.guild.members.cache.get(message.author.id).roles.add(mod)
cdb.delete(`yazı_${message.author.id}`)

}
          })

// ========== Partner Sistemi ========== \\

const pdb = require("croxydb")

const modal = new Discord.Modal()
.setCustomId('form')
.setTitle('SwankyBot Partner Yazısı')
  const a1 = new Discord.TextInputComponent()
  .setCustomId('yazi')
  .setLabel('Partner Yazısı Belirt')
  .setStyle("PARAGRAPH")
  .setPlaceholder('Partner Yazısını Girin.')
  .setRequired(true)
  const row = new MessageActionRow().addComponents(a1);
  
  modal.addComponents(row);
client.on('interactionCreate', async (interaction) => {

    if(interaction.customId === "partner_yazi"){
    await interaction.showModal(modal);
 }
})
client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'form') {
    const yazi = interaction.fields.getTextInputValue('yazi')
interaction.reply({content: "Partner Text Başarıyla Ayarlandı!", ephemeral: true})
pdb.set(`partnertext_${interaction.guild.id}`, yazi)
  }
})
client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if(interaction.customId == "evet") {
    let kanal = pdb.fetch(`partnerkanal_${interaction.guild.id}`)
    let text = pdb.fetch(`partnertext_${interaction.guild.id}`)
    let digersw = pdb.fetch(`partnerlikbekleniyor_${interaction.guild.id}`)
    let as = digersw
    let text2 = pdb.fetch(`partnertext_${as}`)
    let kanal2 = pdb.fetch(`partnerkanal_${as}`)
    client.channels.cache.get(kanal).send(text2)
    client.channels.cache.get(kanal2).send(text)
    message.delete()
    pdb.delete(`partnerlikbekleniyor_${interaction.guild.id}`)
  }
  if(interaction.customId == "hayır") {
    let message = await interaction.channel.messages.fetch(interaction.message.id)
    message.delete()
    let digersw = pdb.fetch(`partnerlikbekleniyor_${interaction.guild.id}`)
    let as = digersw
    let log = pdb.fetch(`partnerlog_${as}`)
    client.channels.cache.get(log).send(interaction.guild.name + " Adlı Sunucu Partnerlik İsteğini Reddetti.")
  }
})

// ========== Çekiliş Sistemi ========== \\

const { Client, Modal, TextInputComponent, InteractionType } = require("discord.js");
const ms = require("ms")
const çdb = require("croxydb")

const modal1 = new Modal()
.setCustomId('formm')
.setTitle('SwankyBot Çekiliş Kurulum')
  const a11 = new TextInputComponent()
  .setCustomId('prize')
  .setLabel('Ödül')
  .setStyle("PARAGRAPH") 
  .setMinLength(2)
  .setPlaceholder('Çekilişte Verilecek Ödül Ne Olacak?')
  .setRequired(true)
	const a22 = new TextInputComponent() 
	.setCustomId('acıklama')
	.setLabel('Açıklama')
  .setStyle("PARAGRAPH")  
	.setMinLength(1)
	.setPlaceholder('Çekiliş İle İlgili Bir kaç Detay Belirt!')
	.setRequired(true)
	const a33 = new TextInputComponent() 
	.setCustomId('zaman')
	.setLabel('Süre')
  .setStyle("PARAGRAPH")  
	.setMinLength(1)
	.setPlaceholder(`1s (saniye) / 1m (dakika)
1h (saat) / 1d (gün)`)
	.setRequired(true)
	
    const row1 = new MessageActionRow().addComponents(a11);
    const row2 = new MessageActionRow().addComponents(a22)
    const row3 = new MessageActionRow().addComponents(a33);
    modal1.addComponents(row1, row2, row3);
  
   
client.on('interactionCreate', async (interaction) => {

	if (interaction.commandName ==="çekiliş-başlat") {    
    await interaction.showModal(modal1);
	}
})
client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit) return;
  if (interaction.customId === 'formm') {


const prize = interaction.fields.getTextInputValue("prize")
const açıklama = interaction.fields.getTextInputValue("acıklama")
const time = interaction.fields.getTextInputValue('zaman')
let var1 = ms(time)
  
  let zaman = Date.now();

  let sure;
  let data
  try {
 data = ms(var1)
  } catch(err){
   interaction.reply({content: "Girdiğin süre geçerli değil!"})
  }
  if(data){
  let s = data.seconds;
  let m = data.minutes;
  let h = data.hours;
  let d = data.days;
  if (s) {
    sure = `${s} Seconds`;
  }
  if (m) {
    sure = `${m} Minutes`;
  }
  if (h) {
    sure = `${h} Hours`;
  }
  if (d) {
    sure = `${d} Days`;
  }
  let vars = await çdb.get(`cekilis.${interaction.guild.id}_${interaction.channel.id}`);
  if (!vars) {
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setEmoji("🎉")
      .setCustomId("giveaway")
      .setStyle("PRIMARY")
    )
    let embed = new MessageEmbed()
      .setColor("AQUA")
      .setTitle(prize)
      .setTimestamp()
.setDescription(`
${açıklama}

<a:armors_saat:994660462140604416> **Süre:** <t:${Math.floor(Date.now()/1000) + Math.floor(var1/1000)}:R> (<t:${Math.floor(Date.now() /1000) + Math.floor(var1/1000)}:f>)
<a:armors_tacc:1014221717356412938> **Düzenleyen:** <@${interaction.user.id}>
:reminder_ribbon: **Kazanan:** **\`1\`**
<:armors_users:1022558807651532830> **Katılımcı:** **\`0\`**`);
interaction.reply({content: "<a:armors_onay6:1010232143919718420> Çekiliş Başarıyla Oluşturuldu.", ephemeral: true})
    interaction.channel.send({embeds: [embed], components: [row]}).then(mesaj => {
      çdb.set(`cekilis_${mesaj.id}`, interaction.user.id)
      çdb.push(`user_${mesaj.id}`, interaction.user.id)
       çdb.set(`reroll_${interaction.guild.id}`, { channelID: interaction.channel.id, messageID: mesaj.id })
      çdb.set(`cekilis_${interaction.channel.id}`, {
        kanalid: interaction.channel.id,
        mesajid: mesaj.id,
        hosted: interaction.user.id,
        sure: var1,
        zaman: zaman,
        toplam: 1,
        odul: prize,
        acıklama: açıklama,
        ex: Math.floor(Date.now()/1000) + Math.floor(var1/1000)
      });
      çdb.set(`cekilis_${mesaj.id}`, {
        kanalid: interaction.channel.id,
        mesajid: mesaj.id,
        hosted: interaction.user.id,
        sure: var1,
        zaman: zaman,
        toplam: 1,
        odul: prize,
        acıklama: açıklama,
        ex: Math.floor(Date.now()/1000) + Math.floor(var1/1000)
      });
    
    });
   

  }

  }
}

})
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if (interaction.customId === 'giveaway') {
    const varmi = çdb.get(`user_${interaction.message.id}`)
    let data = çdb.get(`cekilis_${interaction.channel.id}`)
    if(!varmi) {
      let odul = data.odul
      let sure = data.ex
      let hosted = data.hosted
      let açıklama = data.acıklama
 
      çdb.push(`user_${interaction.message.id}`, interaction.user.id)
      interaction.reply({content: "<a:armors_onay6:1010232143919718420> Başarıyla çekilişe katıldın!", ephemeral: true})
      let katılımcı = çdb.get(`user_${interaction.message.id}`).length;

      const embed = new MessageEmbed()
      .setTitle(odul)
      .setDescription(`
      ${açıklama}
      
      <a:armors_saat:994660462140604416> **Süre:** <t:${sure}:R> (<t:${sure}:f>)
      <a:armors_tacc:1014221717356412938> **Düzenleyen:** <@${hosted}>
      :reminder_ribbon: **Kazanan:** **\`1\`**
      <:armors_users:1022558807651532830> **Katılımcı:** **\`${katılımcı}\`**`)
      .setColor("AQUA")
      message.edit({embeds: [embed]})
    } else if(varmi.includes(interaction.user.id)) {
         
      çdb.unpush(`user_${interaction.message.id}`, interaction.user.id)
      interaction.reply({ content: `<a:armors_onay6:1010232143919718420> Başarıyla çekilişten ayrıldın!` , ephemeral: true })
      let katılımcı = çdb.get(`user_${interaction.message.id}`).length;
      let odul = data.odul
      let sure = data.ex
      let hosted = data.hosted
      let açıklama = data.acıklama
      const embed = new MessageEmbed()
      .setTitle(odul)
      .setDescription(`
      ${açıklama}
      
      <a:armors_saat:994660462140604416> **Süre:** <t:${sure}:R> (<t:${sure}:f>)
      <a:armors_tacc:1014221717356412938> **Düzenleyen:** <@${hosted}>
      :reminder_ribbon: **Kazanan:** **\`1\`**
      <:armors_users:1022558807651532830> **Katılımcı:** **\`${katılımcı}\`**`)
      .setColor("AQUA")
      message.edit({embeds: [embed]})
    } else {
      let odul = data.odul
      let sure = data.ex
      let hosted = data.hosted
      let açıklama = data.acıklama
      çdb.push(`user_${interaction.message.id}`, interaction.user.id)
      interaction.reply({content: "<a:armors_onay6:1010232143919718420> Başarıyla çekilişe katıldın!", ephemeral: true})
      let katılımcı = çdb.get(`user_${interaction.message.id}`).length;
      const embed = new MessageEmbed()
      .setTitle(odul)
      .setDescription(`
      ${açıklama}
      
      <a:armors_saat:994660462140604416> **Süre:** <t:${sure}:R> (<t:${sure}:f>)
      <a:armors_tacc:1014221717356412938> **Düzenleyen:** <@${hosted}>
      :reminder_ribbon: **Kazanan:** **1**
      <:armors_users:1022558807651532830> **Katılımcı:** **\`${katılımcı}\`**`)
      .setColor("AQUA")
      message.edit({embeds: [embed]})
    }
}
})
client.on("ready", async () => {
  const moment = require("moment") 
  require("moment-duration-format")
  moment.locale("tr")
 setInterval(async () => {
   client.guilds.cache.map(async guild => {
     guild.channels.cache.map(async channel => {
       let datax = çdb.fetch(`cekilis_${channel.id}`);
      if (!datax) return;
        let mesaj = datax.mesajid
      
      let data = çdb.get(`cekilis_${mesaj}`)
       if (data) {
         let time = Date.now() - data.zaman;
         let sure = data.sure;

let kanal = guild.channels.cache.get(data.kanalid);
kanal.messages.fetch(data.mesajid).then(async mesaj => {
           })

        if (time >= sure) {
          let winner = [];
          let kazanan = çdb.get(`user_${mesaj}`)[
            Math.floor(Math.random() * çdb.get(`user_${mesaj}`).length)];
            if (!winner.map((winir) => winir).includes(kazanan)) winner.push(kazanan);
         
             
          
           
     
           kanal.messages.fetch(data.mesajid).then(async mesaj => {   
            let katılımcı = çdb.get(`user_${mesaj.id}`).length;  
             let açıklama = data.acıklama
             const embed = new MessageEmbed()
               .setTitle(data.odul)
              .setColor("AQUA")
               .setTimestamp()
             .setDescription(`
${açıklama}
             
<a:armors_unlem:1010142831748329562> **Sona Erdi:** <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
<a:armors_tacc:1014221717356412938>  **Düzenleyen:** <@${data.hosted}>
:reminder_ribbon: **Kazanan:** <@${winner}> 
<:armors_users:1022558807651532830> **Katılımcı Sayısı:** **${katılımcı}**`)
           mesaj.edit({embeds: [embed], components: []})  
    
            if(winner){
             çdb.set(`cekilis_${mesaj.id}`, data.odul);  
             çdb.delete(`cekilis_${channel.id}`);
            
             kanal.send(`<a:armors_konfeti:990610008632860742> Tebrikler <@${winner}>! Çekiliş Sonlandı Ve **${data.odul}** Kazandın(ız)!`)
           çdb.set(`son_${mesaj.id}`, true)
       
            } else {
              çdb.delete(`cekilis_${mesaj.id}`);  
              çdb.delete(`cekilis_${channel.id}`);
              let açıklama = data.acıklama
               const embed = new MessageEmbed()
               .setTitle(data.odul)
              .setColor("AQUA")
             .setDescription(`
${açıklama}
             
<a:armors_unlem:1010142831748329562> **Sona Erdi:** <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
<a:armors_tacc:1014221717356412938> **Düzenleyen:** <@${data.hosted}>
:reminder_ribbon: **Kazanan:** Bilinmiyor.
<:armors_users:1022558807651532830> **Katılımcı:** **\`0\`**`) 
mesaj.edit({embeds: [embed], components: []})

         
            }
                   })                                           
                  }
         }
       })
       }
     );
   });
 }, 5000);


// ========== Bot List Sistemi ========== \\

const botlistdatabase = require("croxydb");

const StormModal = new Modal()
    .setCustomId('modalform')
    .setTitle('Botlist Başvuru Formu')
const a111 = new TextInputComponent()
    .setCustomId('id')
    .setLabel('Bot ID')
    .setStyle("PARAGRAPH")
    .setMinLength(15)
    .setMaxLength(25)
    .setPlaceholder('Botunun ID (Kimliği) nedir?')
    .setRequired(true)
const a222 = new TextInputComponent()
    .setCustomId('prefix')
    .setLabel('Bot Prefixi')
    .setStyle("PARAGRAPH")
    .setMinLength(1)
    .setMaxLength(4)
    .setPlaceholder('Botunun Prefixi (Ön Ek) nedir?')
    .setRequired(true)
const a333 = new TextInputComponent()
    .setCustomId('dbl')
    .setLabel('DBL (TOP.gg) Onayı')
    .setStyle("PARAGRAPH")
    .setMinLength(1)
    .setMaxLength(7)
    .setPlaceholder('Bot DBL onay durumu nedir? (Onaylı / Onaysız)')
    .setRequired(true)

const row111 = new MessageActionRow().addComponents(a111);
const row222 = new MessageActionRow().addComponents(a222);
const row333 = new MessageActionRow().addComponents(a333)
StormModal.addComponents(row111, row222, row333);


client.on('interactionCreate', async (interaction) => {


    if (interaction.commandName === "bot-ekle") {

        const zatenEklenmis = new MessageEmbed()
            .setTitle("Başarısız!")
            .setDescription("Zaten eklenmiş olan bir botun var!")
            .setColor("Red")
        let varmi = botlistdatabase.get(`ekledi_${interaction.user.id}`)
        if (varmi) return interaction.reply({ embeds: [zatenEklenmis], ephemeral: true })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit) return;
    if (interaction.customId === 'modalform') {

        let onay = botlistdatabase.get(`onay_${interaction.guild.id}`)
        let logg = botlistdatabase.get(`log_${interaction.guild.id}`)
        let botRol = botlistdatabase.get(`botRol_${interaction.guild.id}`)
        let devRol = botlistdatabase.get(`devRol_${interaction.guild.id}`)
        let botekle = botlistdatabase.get(`botekle_${interaction.guild.id}`)
        let ayrildiLog = botlistdatabase.get(`ayrildiLog_${interaction.guild.id}`)
        let adminRol = botlistdatabase.get(`adminRol_${interaction.guild.id}`)

        if (!onay) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!logg) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!botRol) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!devRol) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!adminRol) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!botekle) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })
        if (!ayrildiLog) return interaction.reply({ content: "Botlist sistemi ayarlanmamış!", ephemeral: true })

        const Discord = require("discord.js")
        const id = interaction.fields.getTextInputValue("id")
        const prefix = interaction.fields.getTextInputValue('prefix')
        const dblonaydurumu = interaction.fields.getTextInputValue("dbl")
        const sahip = (`<@${interaction.user.id}>`)

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Botu Ekle")
                    .setStyle("LINK")
                    .setURL("https://discord.com/oauth2/authorize?client_id=" + id + "&scope=bot&permissions=0"),
                new Discord.MessageButton()
                    .setLabel("Onayla")
                    .setStyle("SUCCESS")
                    .setCustomId("onayla"),
                new Discord.MessageButton()
                    .setLabel("Reddet")
                    .setStyle("DANGER")
                    .setCustomId("reddet")
            )

        adminRol = botlistdatabase.get(`adminRol_${interaction.guild.id}`)
        let a = await client.users.fetch(id);
        let avatar = a.avatar
        let link = "https://cdn.discordapp.com/avatars/" + id + "/" + avatar + ".png?size=1024"

        const gonderildi = new MessageEmbed()
            .setTitle("Başarılı!")
            .setDescription("Bot ekleme başvurun başarıyla yetkililere gönderildi!")
            .setColor("GREEN")

        const embed = new MessageEmbed()
            .setTitle("Sıraya Yeni Bot Eklendi!")
            .setDescription("Bot Sahibi: " + sahip + "\n\n**İD** ```" + id + "``` **Prefix** ```" + prefix + "``` **DBL Onay Durumu** ```" + dblonaydurumu + "```")
            .setColor("YELLOW")
            .setThumbnail(link)
        let log = botlistdatabase.get(`onay_${interaction.guild.id}`)

        interaction.reply({ content: `Bot ekleme başvurun başarıyla yetkililere gönderildi!`, ephemeral: true })
        client.channels.cache.get(log).send({ content: "<@&" + adminRol + ">", embeds: [embed], components: [row] }).then((mesaj) => {
            botlistdatabase.set(`bot_${mesaj.id}`, { user: interaction.user.id, bot: id })
            botlistdatabase.set(`ekledi_${interaction.user.id}`, id)
        })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "reddet") {

        let message = await interaction.channel.messages.fetch(interaction.message.id)
        let log = botlistdatabase.get(`log_${interaction.guild.id}`)
        var data = botlistdatabase.fetch(`bot_${interaction.message.id}`)
        var uye = data.user
        var bot = data.bot

        let admin = botlistdatabase.get(`adminRol_${interaction.guild.id}`)

        if (!interaction.member.roles.cache.has(admin)) return interaction.reply({ content: "Bu işlemi gerçekleştirmek için <@&" + admin + "> rolüne sahip olmalısın!", ephemeral: true })

        let a = await client.users.fetch(bot);
        let avatar = a.avatar
        let link = "https://cdn.discordapp.com/avatars/" + bot + "/" + avatar + ".png?size=1024"


        client.channels.cache.get(log).send({ content: "<@" + uye + ">, " + "<@" + data.bot + "> adlı botunun başvurusu maalesef reddedildi!" })
        message.delete()
    }

    if (interaction.customId === "onayla") {

        let admin = botlistdatabase.get(`adminRol_${interaction.guild.id}`)

        if (!interaction.member.roles.cache.has(admin)) return interaction.reply({ content: "Bu işlemi gerçekleştirmek için <@&" + admin + "> rolüne sahip olmalısın!", ephemeral: true })

        let message = await interaction.channel.messages.fetch(interaction.message.id)
        let log = botlistdatabase.get(`log_${interaction.guild.id}`)
        let dev = botlistdatabase.get(`devRol_${interaction.guild.id}`)
        let botrol = botlistdatabase.get(`botRol_${interaction.guild.id}`)
        var data = botlistdatabase.fetch(`bot_${interaction.message.id}`)
        var uye = data.user
        var bot = data.bot
        let a = await client.users.fetch(bot);
        let avatar = a.avatar
        let link = "https://cdn.discordapp.com/avatars/" + bot + "/" + avatar + ".png?size=512"

        let eklendimi = interaction.guild.members.cache.get(bot)

        if (!eklendimi) return interaction.reply({ content: "Önce botu sunucuya eklemelisin!", ephemeral: true })

        client.channels.cache.get(log).send({ content: "<@" + uye + ">, " + "<@" + data.bot + "> adlı botunun başvurusu kabul edildi!" })
        interaction.guild.members.cache.get(uye).roles.add(dev).catch(err => { })
        interaction.guild.members.cache.get(bot).roles.add(botrol).catch(err => { })
        message.delete()
    }
})

client.on('interactionCreate', async interaction => {
    if (interaction.commandName === "botlist-kur") {

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return;

        let botekle = botlistdatabase.get(`botekle_${interaction.guild.id}`)

        const menu = new Discord.MessageEmbed()
            .setColor("#7e7e7e")
            .setTitle("Botunu Ekle!")
            .setDescription("Aşağıda bulunan `Bot Ekle` adlı butona basarak botunu ekletebilirsin!")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })

        const roww1 = new Discord.MessageActionRow()

            .addComponents(
                new Discord.MessageButton()
                    .setEmoji("🤖")
                    .setLabel("Bot Ekle")
                    .setStyle("SECONDARY")
                    .setCustomId("bot-ekle")
            )

        client.channels.cache.get(botekle).send({ embeds: [menu], components: [roww1] })
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === "bot-ekle") {
        await interaction.showModal(StormModal);
    }
})

// Sistemi Sıfırla - Button
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "kapat") {
        const yetkii = new Discord.MessageEmbed()
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })
            .setColor("RED")

        const embed1 = new Discord.MessageEmbed()
            .setTitle("Başarıyla Sıfırlandı!")
            .setDescription("> Botlist sistemi başarıyla **sıfırlandı**!")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })
            .setColor("GREEN")

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [yetkii], ephemeral: true })

        botlistdatabase.delete(`log_${interaction.guild.id}`)
        botlistdatabase.delete(`botRol_${interaction.guild.id}`)
        botlistdatabase.delete(`devRol_${interaction.guild.id}`)
        botlistdatabase.delete(`adminRol_${interaction.guild.id}`)
        botlistdatabase.delete(`onay_${interaction.guild.id}`)
        botlistdatabase.delete(`botekle_${interaction.guild.id}`)
        botlistdatabase.delete(`ayrildiLog_${interaction.guild.id}`)
        return interaction.reply({ embeds: [embed1], ephemeral: true })
    }
})

const unban = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setEmoji("🔓")
            .setLabel("Yasağı Kaldır")
            .setStyle("DANGER")
            .setCustomId("unban")
    )

client.on('guildMemberRemove', async member => {

    let ayrildiLog = botlistdatabase.get(`ayrildiLog_${member.guild.id}`)

    var data = botlistdatabase.fetch(`ekledi_${member.id}`)
    if (!data) return;

    let stormData = data

    const lourityBanEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Yasaklandı!")
        .setDescription("<@" + member.id + ">, sunucudan ayrıldığı için **botunu** sunucudan yasakladım!")

    member.guild.members.ban(stormData).catch(() => { })
    member.guild.channels.cache.get(ayrildiLog).send({ embeds: [lourityBanEmbed], components: [unban] }).then(mesaj => {
        botlistdatabase.set(`botuser_${mesaj.id}`, member.id)
    })
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "unban") {
        let message = await interaction.channel.messages.fetch(interaction.message.id)
        var user = botlistdatabase.fetch(`botuser_${interaction.message.id}`)
        var data = botlistdatabase.fetch(`ekledi_${user}`)

        let lourityData = data

        const yetkiii = new Discord.MessageEmbed()
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })
            .setColor("RED")

        const embed1 = new Discord.MessageEmbed()
            .setTitle("Başarılı!")
            .setDescription("> Botun yasağı başarıyla **kaldırıldı**!")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })
            .setColor("GREEN")

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [yetkiii], ephemeral: true });

        if (!lourityData) return interaction.reply({ content: "Bu botun yasağı zaten kaldırılmış!", ephemeral: true })

        interaction.guild.members.unban(lourityData).catch(() => { })
        message.delete()
        return interaction.reply({ embeds: [embed1], ephemeral: true })
    }

})

// Ayarlar Button 
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "ayarlar") {
        let log = botlistdatabase.get(`log_${interaction.guild.id}`)
        let onayKanal = botlistdatabase.get(`onay_${interaction.guild.id}`)
        let botEkle = botlistdatabase.get(`botekle_${interaction.guild.id}`)
        let ayrildiLog = botlistdatabase.get(`ayrildiLog_${interaction.guild.id}`)
        let botRol = botlistdatabase.get(`botRol_${interaction.guild.id}`)
        let devRol = botlistdatabase.get(`devRol_${interaction.guild.id}`)
        let adminRol = botlistdatabase.get(`adminRol_${interaction.guild.id}`)

        const mesaj = new Discord.MessageEmbed()
            .setTitle("Botlist Sistem Ayarları")
            .addField("**<:armors_message:1011737452836307005> Log Kanalı**", `<#${log || "Ayarlanmadı!"}>`, true)
            .addField("**<:armors_evet:999251486083129415> Onay Kanalı**", `<#${onayKanal || "Ayarlanmadı!"}>`, true)
            .addField("**<:armors_book:994181553565466624> Bot Ekle Kanalı**", `<#${botEkle || "Ayarlanmadı!"}>`, true)
            .addField("**<a:armors_cikis:990227252534972416>  Ayrıldı Log Kanalı**", `<#${ayrildiLog || "Ayarlanmadı!"}>`, true)
            .addField("**<:armors_bots:998263060433219645> Bot Rolü**", `<@&${botRol || "Ayarlanmadı!"}>`, true)
            .addField("**<:armors_developer_white:992363311339413524> Developer Rolü**", `<@&${devRol || "Ayarlanmadı!"}>`, true)
            .addField("**<:armors_admin:992367683729363034> Yetkili Rolü**", `<@&${adminRol || "Ayarlanmadı!"}>`, true)
            .setColor("#7e7e7e")

        const yetki = new Discord.MessageEmbed()
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
            .setFooter({ text: "SwankyBot Bot List Sistemi", iconURL: client.user.avatarURL() })
            .setColor("RED")
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [yetki], ephemeral: true });

        interaction.reply({ embeds: [mesaj], ephemeral: true })
    }
})


// ========== Başvuru Sistemi ========== \\

const bdb = require("croxydb")

const başvurumodal = new Modal()
.setCustomId('ytbasvuruform')
.setTitle('Başvuru Formu!')
  const b1 = new TextInputComponent()
  .setCustomId('basvuruisim')
  .setLabel('İsminiz')
  .setStyle("SHORT") 
  .setMinLength(2)
  .setPlaceholder('Umut')
  .setRequired(true)
	const b2 = new TextInputComponent() 
	.setCustomId('basvuruyas')
	.setLabel('Yaşınız')
  .setStyle("SHORT")  
	.setMinLength(1)
	.setPlaceholder('16')
	.setRequired(true)
	const b3 = new TextInputComponent() 
	.setCustomId('basvurubiz')
	.setLabel('Neden Biz?')
  .setStyle("PARAGRAPH")  
	.setMinLength(1)
	.setPlaceholder('Neden Bizizle Çalışmak İstiyorsun?')
	.setRequired(true)
	const b4 = new TextInputComponent() 
	.setCustomId('basvuruyetkili')
	.setLabel('Daha Önce Bir Sunucuda Yetkili Oldun Mu?')
	.setMinLength(1)
  .setStyle("PARAGRAPH")  
	.setPlaceholder('Farklı bir sunucuda yetkili oldun mu?')
	const b5 = new TextInputComponent() 
    .setCustomId('basvuruaciklama')
    .setLabel('Eklemek İstediğin?')
    .setMinLength(1)
    .setStyle("PARAGRAPH") 
    .setPlaceholder('Ek olarak bir şey söylemek istiyorsan yazabilirsin.')
    const roww1 = new MessageActionRow().addComponents(b1);
    const roww2 = new MessageActionRow().addComponents(b2);
    const roww3 = new MessageActionRow().addComponents(b3);
    const roww4 = new MessageActionRow().addComponents(b4);
    const roww5 = new MessageActionRow().addComponents(b5);
    başvurumodal.addComponents(roww1, roww2, roww3, roww4, roww5);
  
   
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "ytbasvuru"){
    await interaction.showModal(başvurumodal);
	}
})
 
    client.on('interactionCreate', async interaction => {
      if (!interaction.isModalSubmit) return;
      if (interaction.customId === 'ytbasvuruform') {

  let kanal = bdb.fetch(`basvurulogg_${interaction.guild.id}`)
let rol = bdb.fetch(`basvururoll_${interaction.guild.id}`)


		const isim = interaction.fields.getTextInputValue('basvuruisim')
		const yas = interaction.fields.getTextInputValue('basvuruyas')
		const biz = interaction.fields.getTextInputValue('basvurubiz')
		const yetkili = interaction.fields.getTextInputValue('basvuruyetkili')
    const aciklama = interaction.fields.getTextInputValue('basvuruaciklama')
	
    const basvuruembed = new Discord.MessageEmbed()
    .setTitle("Yeni Başvuru Geldi!")
    .setDescription(`Başvuran: **${interaction.user.tag}**\nİsim: **${isim}**\nYaş: **${yas}**\nNeden Biz? **${biz}**\nYetkili Olduğu Sunucular: **${yetkili}**\nAçıklama: **${aciklama}**`)
    .setColor("7e7e7e")
    const row = new Discord.MessageActionRow()

    const basvuruonay = new MessageButton()
    .setCustomId('onay')
    .setLabel('Evet')
    .setStyle("SUCCESS")
    const basvurured = new MessageButton()
    .setCustomId("red")
    .setLabel("Hayır")
    .setStyle("DANGER")
    
    const basvururow = new MessageActionRow().addComponents(basvuruonay).addComponents(basvurured)
  
    
    


    await interaction.reply({ content: 'Başvurun gönderildi.', ephemeral: true });
    client.channels.cache.get(kanal).send({embeds: [basvuruembed], components: [basvururow]}).then(message => {
      bdb.set(`basvuru_${message.id}`, interaction.user.id)
      })
    }
    })




client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

if (interaction.customId == "onay") {
  interaction.deferUpdate()
  const mesajj = await interaction.channel.messages.fetch(interaction.message.id)
  const data = await bdb.get(`basvuru_${interaction.message.id}`)
  if(!data) return;
const uye = data
  let log = bdb.fetch(`basvurukanall_${interaction.guild.id}`)
  let rol = bdb.fetch(`basvururoll_${interaction.guild.id}`)
 
  client.channels.cache.get(log).send(`<@${uye}> Başvurun **Kabul Edildi** Rolün Verildi.`)
interaction.guild.members.cache.get(uye).roles.add(rol)
  bdb.delete(`basvuru_${interaction.guild.id}`)
  mesajj.delete()

}
})


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

if (interaction.customId == "red") {
  interaction.deferUpdate()
  const mesajjj = await interaction.channel.messages.fetch(interaction.message.id)
  const data = await bdb.get(`basvuru_${interaction.message.id}`)
  if(!data) return;
const uye = data
  let log = bdb.fetch(`basvurukanall_${interaction.guild.id}`)
  
 
  client.channels.cache.get(log).send(`<@${uye}> Başvurun **Red Edildi** üzgünüm.`)
  
  bdb.delete(`basvuru_${interaction.guild.id}`)
  mesajjj.delete()
  

}
})


// ========== Seviye Sistemi ========== \\

const ndb = require("nrc.db")

client.on("messageCreate", async message => {

  if(message.author.bot == true) return;

  let kontrol = ndb.fetch(`level_log_${message.guild.id}`)
  if(kontrol == false) {};

  let kontrol2 = ndb.fetch(`xp_${message.guild.id}_${message.author.id}`)
  if(!kontrol2) ndb.set(`xp_${message.guild.id}_${message.author.id}`, 0)
  ndb.add(`xp_${message.guild.id}_${message.author.id}`, 1)

  let kontrol3 = ndb.fetch(`xp_${message.guild.id}_${message.author.id}`)
  let xplevel = 100
  if(kontrol3 >= xplevel){
    let kontrol4 = ndb.fetch(`lvl_${message.guild.id}_${message.author.id}`)
    if(!kontrol4) ndb.set(`lvl_${message.guild.id}_${message.author.id}`, 0)

    ndb.add(`lvl_${message.guild.id}_${message.author.id}`, 1)
    let kontrol5 = ndb.fetch(`level_tebrik_${message.guild.id}`)

    ndb.set(`xp_${message.guild.id}_${message.author.id}`, 0)
    if(kontrol5 == true){

          let günlük = ["55","75","85","95","105","115","125","135","145","155","165","175","185","195","205"]

    let ödül = günlük[Math.floor(Math.random() * günlük.length)]

    edb.add(`coin_${message.author.id}`, Number(ödül))

      message.reply(`Tebrikler seviye atladın! Yeni seviyen **${ndb.fetch(`lvl_${message.guild.id}_${message.author.id}`)}**, ödülün **${ödül} SSCoin**`)
      client.channels.cache.get(kontrol).send(`Tebrikler <@${message.author.id}>! **${ndb.fetch(`lvl_${message.guild.id}_${message.author.id}`)}** Seviyeye uşaltın ve hesabına **${ödül} SSCoin** yatırıldı. :partying_face:`)
    }
  } 
})


// ========== Ekonomi Sistemi ========== \\

const edb = require("nrc.db")

setTimeout(() => {
  let liste = edb.fetch(`vadeli_hesaplar`)
liste.forEach(elem => {
  
    
let coin = edb.fetch(`banka_coin_vadeli_${elem}`)
let miktar = Number(coin)
if(!miktar) return;
if(miktar === 0) return;

var son = (miktar*5)/100
edb.add(`banka_coin_vadeli_${elem}`, son)
message.reply(`<@${elem}> isimli kişinin vadeli kazancı **${son}** SSCoin 'dir. `)
});

}, ms("4h"));


// ========== UPTIME SISTEMI ========== \\

const uptimedb = require("croxydb")

// Uptime Modal
const uptimeEkleModal = new Discord.Modal()
    .setCustomId('uekleform')
    .setTitle('Link Ekle')
const uptimeekleform = new Discord.TextInputComponent()
    .setCustomId('link')
    .setLabel('Proje Linki')
    .setStyle("SHORT")
    .setMinLength(8)
    .setMaxLength(200)
    .setPlaceholder('https://armors-swanky.glitch.me')
    .setRequired(true)

const uptimeeklerow = new Discord.MessageActionRow().addComponents(uptimeekleform);
uptimeEkleModal.addComponents(uptimeeklerow);


const uptimeSilModal = new Discord.Modal()
    .setCustomId('usilform')
    .setTitle('Link Sil')
const uptimesilform = new Discord.TextInputComponent()
    .setCustomId('baslik1')
    .setLabel('Proje Linki')
    .setStyle("SHORT")
    .setMinLength(8)
    .setMaxLength(200)
    .setPlaceholder('https://armors-swanky.glitch.me')
    .setRequired(true)

const uptimesilrow = new Discord.MessageActionRow().addComponents(uptimesilform);
uptimeSilModal.addComponents(uptimesilrow);

// Uptime Kanala Gönderme
client.on('interactionCreate', async interaction => {

  if (interaction.commandName === "uptime-kur") {

      const row = new Discord.MessageActionRow()

          .addComponents(
              new Discord.MessageButton()
                  .setEmoji("➕")
                  .setLabel("Ekle")
                  .setStyle("SUCCESS")
                  .setCustomId("ekle")
          )
          .addComponents(
              new Discord.MessageButton()
                  .setEmoji("🗑️")
                  .setLabel("Sil")
                  .setStyle("DANGER")
                  .setCustomId("sil")
          )
          .addComponents(
              new Discord.MessageButton()
                  .setEmoji("ℹ️")
                  .setLabel("Linklerim")
                  .setStyle("PRIMARY")
                  .setCustomId("linklerim")
          )

      const server = interaction.guild
      let sistem = uptimedb.get(`uptimeSistemi_${interaction.guild.id}`)
      if (!sistem) return;
      let channel = sistem.kanal
      let role = sistem.rol

      const uptimeMesaj = new Discord.MessageEmbed()
          .setColor("AQUA")
          .setTitle("Uptime Servisi")
          .setDescription(`**Üyelerimizin ekleme hakları**
\`•\` Üyelerimizin hakkı: __**2 Adet Link**__ Ekleme.
\`•\` <@&${role}> rolünün hakkı: __**5 Adet Link**__ Ekleme.

**Kullanım**
\`•\` Link eklemek için: Aşağıdaki **Ekle** butonu.
\`•\` Link silmek içim: Aşağıdaki **Sil** butonu.
\`•\` Eklediğiniz linkleri görmek için: Aşağıdaki **Linklerim** butonu.`)
          .setThumbnail(server.iconURL({ dynamic: true }))
          .setFooter({ text: "⩛ Armors ❤️ SwankyBot" })

      interaction.guild.channels.cache.get(channel).send({ embeds: [uptimeMesaj], components: [row] })

  }

})

// Uptime Ekle
client.on('interactionCreate', async interaction => {
  if (interaction.customId === "ekle") {

      await interaction.showModal(uptimeEkleModal);
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit) return;
  if (interaction.customId === 'uekleform') {

      if (!uptimedb.fetch(`uptimeLinks_${interaction.user.id}`)) {
          uptimedb.set(`uptimeLinks_${interaction.user.id}`, [])
      }

      const link = interaction.fields.getTextInputValue("link")

      let link2 = uptimedb.fetch(`uptimeLinks_${interaction.user.id}`, [])

      let sistem = uptimedb.get(`uptimeSistemi_${interaction.guild.id}`)
      if (!sistem) return;
      let ozelrol = sistem.rol

      if (!link) return

      if (!interaction.member.roles.cache.has(ozelrol)) {
          if (uptimedb.fetch(`uptimeLinks_${interaction.user.id}`).length >= 2) {
              return interaction.reply({
                  content: "En fazla **2 Adet Link** ekleyebilirsin! Hakkını arttırmak için booster olmalısın.",
                  ephemeral: true
              }).catch(e => { })
          }
      }

      if (interaction.member.roles.cache.has(ozelrol)) {
          if (uptimedb.fetch(`uptimeLinks_${interaction.user.id}`).length >= 5) {
              return interaction.reply({
                  content: "En fazla **5 Adet Link** ekleyebilirsin!",
                  ephemeral: true
              }).catch(e => { })
          }
      }


      if (link2.includes(link)) {
          return interaction.reply({
              content: "Bu link sistemde bulunmakta!",
              ephemeral: true
          }).catch(e => { })
      }

      if (!link.startsWith("https://")) {
          return interaction.reply({
              content: "Linkte hata! Lütfen başında `https://` olduğundan emin ol.",
              ephemeral: true
          }).catch(e => { })
      }

      if (!link.endsWith(".glitch.me")) {
          return interaction.reply({
              content: "Linkte hata! Lütfen sonunda `.glitch.me` olduğundan emin ol.",
              ephemeral: true
          }).catch(e => { })
      }


      uptimedb.push(`uptimeLinks_${interaction.user.id}`, link)
      uptimedb.push(`uptimeLinks`, link)
      interaction.reply({
          content: "Linkin başarıyla sisteme eklendi!",
          ephemeral: true
      }).catch(e => { })
  }
})

// Uptime Sil
client.on('interactionCreate', async interaction => {
  if (interaction.customId === "sil") {

      await interaction.showModal(uptimeSilModal);
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit) return;
  if (interaction.customId === 'usilform') {

      const links = uptimedb.get(`uptimeLinks_${interaction.user.id}`)
      let linkInput = interaction.fields.getTextInputValue("baslik1")

      if (!links.includes(linkInput)) return interaction.reply({ content: "Sistemde böyle bir link bulamadım!", ephemeral: true }).catch(e => { })

      uptimedb.unpush(`uptimeLinks_${interaction.user.id}`, linkInput)
      uptimedb.unpush(`uptimeLinks`, linkInput)

      return interaction.reply({ content: "Link başarıyla sistemden silindi!", ephemeral: true }).catch(e => { })
  }
})

// Linklerim
client.on('interactionCreate', async interaction => {
  if (interaction.customId === "linklerim") {

      const rr = uptimedb.get(`uptimeLinks_${interaction.user.id}`)
      if (!rr) return interaction.reply({ content: "Sisteme eklenmiş bir link bulamadım!", ephemeral: true })

      const links = uptimedb.get(`uptimeLinks_${interaction.user.id}`).map(map => `\`•\` \`${map}\` `).join("\n")

      const linklerimEmbed = new Discord.MessageEmbed()
          .setTitle(`Uptime Linklerin`)
          .setDescription(`${links || "Sisteme eklenmiş bir link bulamadım!"}`)
          .setFooter({ text: "⩛ Armors ❤️ SwankyBot" })
          .setColor("AQUA")

      interaction.reply({
          embeds: [linklerimEmbed],
          ephemeral: true
      }).catch(e => { })

  }
})
// ============================= HERKESE AÇIK KOMUTLAR SON ============================= \\

client.login(process.env.TOKEN || ayarlar.token);
