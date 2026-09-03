const Discord = require("discord.js"); //V13
const client = new Discord.Client({intents: 98303})

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['avatar'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Sizin veya belirttiğiniz kişinin avatarını gösterir.",
    kategori: "Genel",
    async execute(client, message, args) {
       
let muser = message.mentions.users.first();
let userid;
if(isNaN(args[0])){
  if(!muser){
    userid = message.author.id;
  }else{
    userid = muser.id;
  }
}else{
  userid = args[0];
}
try{
let user = await client.users.fetch(userid);
let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
if(avatar.endsWith(".gif?size=1024")) {

let embed = new Discord.MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
.setDescription(`**[PNG](${user.displayAvatarURL({ format: 'png', size: 1024 })})** | **[JPEG](${user.displayAvatarURL({ format: 'jpeg', size: 1024 })})** | **[GIF](${user.displayAvatarURL({ format: 'gif', size: 1024 })})** | **[WEBP](${user.displayAvatarURL({ format: 'webp', size: 1024 })})**`)
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("RED")
 message.channel.send({embeds: [embed]})

} else {

  let embed = new Discord.MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
.setDescription(`**[PNG](${user.displayAvatarURL({ format: 'png',  size: 1024 })})** | **[JPEG](${user.displayAvatarURL({ format: 'jpeg',  size: 1024 })})** | **~~GIF~~** | **[WEBP](${user.displayAvatarURL({ format: 'webp',  size: 1024 })})**`)
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("RED")
 message.channel.send({embeds: [embed]})

}
}catch{
  message.reply("Kullanıcıyı Bulamadım!");
  return;
}
      
    }
}