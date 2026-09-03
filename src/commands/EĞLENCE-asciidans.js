const Discord = require("discord.js");
const oneLine = require("common-tags").oneLine;
const ascii = require("figlet");

    module.exports = {
    slash: false, //komut eğer slash ise true eğer prefixli ise false yazınız.
  	name: ['asciidans'],  //komut ismi
    description: 'Yazdığınız yazıyı ascii dans şekline çevirir.', //komut açıklaması
    kategori: "Eğlence",
    option: [],
	async execute(client, interaction, args) {  //her slash commandda burası aynı olmak zorunda
		
      const db = require("quick.db");


  var yazi = args.slice(0).join(" ");
  if (yazi.length < 1)
    return interaction.reply("Lütfen **1 ile 8** arasında yazı yaznz");
  if (yazi.length > 8)
    return interaction.reply("Lütfen **1 ile 8** arasında yazı yaznz");

  ascii(
    yazi,
    {
      font: "Dancing Font",
      horizontalLayout: "fitted",
      verticalLayout: "fitted"
    },
    function(err, data) {
      if (err) {
        interaction.reply(`HATA ${err}`);
        console.error(err);
      }

      interaction.reply("```css\n" + data + "\n```");
    }
  );//komuta cevap verirken await ekleneyi unutmayın yoksa hata verir.
	},
};