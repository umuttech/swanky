const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const db = require("croxydb")
module.exports = {
  slash: true,
  name: ['başvur'],
  description: "Başvuru yaparsınız.",
  option: [],
   
  async execute(client, interaction) {

  const button = new MessageButton()
  .setLabel('Başvur')
  .setStyle("SUCCESS")
  .setCustomId('ytbasvuru')
  
    const row = new MessageActionRow().addComponents(button)
    
  interaction.reply({ components: [row], ephemeral: true })


}
                 }