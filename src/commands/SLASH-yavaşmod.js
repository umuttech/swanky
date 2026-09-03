const { Client, MessageEmbed } = require("discord.js");
module.exports = {
  slash: true,
  name: ['yavaş-mod'],
  description: "Kanalın Yavaş Modunu Ayarlarsın!",
  option: [
    {
        name:"kanal",
        description:"Lütfen bir kanal etiketle!",
        type: 'channel',
        require:true
    },
    {
        name:"saniye",
        description:"Yavaş Modu Kaç Saniye Yapacaksın?",
        type: 'number',
        require:true
    },
   
   
    
],

  async execute(client, interaction) {
    if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({content: "Bu komut kullanabilmek için `KANALLARI YÖNET` yetkisine sahip olmalısın!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
    const s = interaction.options.getNumber('saniye') 
    if (s > 21600) return interaction.reply("Süre limiti maksimum **6 saat** olabilir.")
    const token = process.env.TOKEN || client.token;
    var request = require('request');
request({
url: `https://discordapp.com/api/v9/channels/${kanal2.id}`,
method: "PATCH",
json: {
rate_limit_per_user: s
},
headers: {
"Authorization": `Bot ${token}`
},
})
   interaction.reply(`Yazma süre limiti **${s} saniye** olarak ayarlanmıştır.`)


  }

};
