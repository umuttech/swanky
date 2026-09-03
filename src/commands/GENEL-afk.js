const Discord = require("discord.js"); //V13
const client = new Discord.Client({intents: 98303})
const db = require("quick.db")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['afk'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Sebep ile AFK olursunuz.",
    kategori: "Genel",
    async execute(client, message, args) {
      
      
              const codemarefiuser = db.fetch(`kisiid_${message.author.id}`);
        const codemarefisebep = args[0];

        // Eğer Sebep Girilmez İse
        if(!args[0]) {
            // Let Tanımları
            let kisi = message.guild.members.cache.get(message.author.id);

            // Json formatına yazılacak kodlarımız
            db.set(`strsebep_${message.author.id}`, 'Sebep Yok');
            db.set(`kisiid_${message.author.id}`,message.author.id);
            let sebep = db.fetch(`strsebep_${message.author.id}`);

            // Bilgilendirme Mesajı Atalım
            const afk = new Discord.MessageEmbed()
            .setDescription(`${message.author} başarılı bir şekilde \`${sebep}\` sebebiyle **AFK** moduna geçtin.`)
            .setColor('#00ff00')
            message.channel.send({ content: `Başarılı bir şekilde **AFK** oldun!
Sebep: \`${sebep}\`` });


        }

        // Eğer Sebep Girerse
        if(args[0]) {
            // Let Tanımları
            let armsebep = args.join(' ');
            let kisi = message.guild.members.cache.get(message.author.id);

        
            // Json formatına yazılacak kodlarımız
            db.set(`strsebep_${message.author.id}`, armsebep);
            db.set(`kisiid_${message.author.id}`,message.author.id);
            let sebep = db.fetch(`strsebep_${message.author.id}`);

            // Bilgilendirme Mesajı Atalım

            message.channel.send({ content: `Başarılı bir şekilde **AFK** oldun!
Sebep: \`${sebep}\`` });
        }
      
    }
}