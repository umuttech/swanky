const Discord = require('discord.js');

module.exports = {
     slash: true,
     name: ['google'],
     description: "Google'da arama yaparsınız",
     option: [
             { name: "ara",
               description: "Aranacak yazıyı gir.",
               type: 'string',
               require: true }],
 
   async execute(client, interaction, args) {

    let name = interaction.options.getString('ara');
    let link = `https://www.google.com/search?q=${name}`;

    const button = new Discord.MessageButton().setLabel("Arama Sonuçları").setStyle("LINK").setURL(link)
    const row = new Discord.MessageActionRow().addComponents(button)

   interaction.reply({content: `**Arama sonuçlarına aşağıdaki butondan ulaşabilirsin.**`, components: [row]})

}
}