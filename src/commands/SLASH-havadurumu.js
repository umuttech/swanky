const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['hava-durumu'],
  description: 'Dünya Üzerindeki Bir Yerin Hava Durumuna Bakarsınız',
  option: [
      {
      name: 'yer', 
      description: "hava durumuna bakılacak yer", 
      type: 'string', 
      require: true 
      }
     ],
  async execute(client, interaction) {
    
    const havadurumu = new MessageEmbed()
    .setTitle("Hava Durumu!")
    .setColor("GREEN")
    .setImage('https://www.wttr.in/'+ interaction.options.getString("yer") +'.png?m ')

 interaction.reply({ embeds: [havadurumu] });
  },
};