const Discord = require("discord.js"); //V13
const db = require("quick.db")

module.exports = {
    slash: true, //kodun slash olmadığını belirttik.
    name: ['afk'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Sebep ile AFK olursunuz.",
    kategori: "Genel",
    option: [
      {
      name: "sebep",
      description: "AFK sebebini belirt!",
      type: 'string',
      require: false
      }
    ],
    async execute(client, interaction) {
      
      

            // Let Tanımları
            let armsebep = interaction.options.getString('sebep');
            let kisi = interaction.user

        
            // Json formatına yazılacak kodlarımız
            db.set(`strsebep_${interaction.user.id}`, armsebep || "Sebep Yok")
            db.set(`kisiid_${interaction.user.id}`,interaction.user.id);
            let sebep = db.fetch(`strsebep_${interaction.user.id}`);

            // Bilgilendirme Mesajı Atalım

            interaction.reply({ content: `Başarılı bir şekilde **AFK** oldun!
Sebep: \`${sebep}\`` }).catch(() => {});
        }
      
    }