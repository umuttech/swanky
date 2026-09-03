//burasının ne olduğunu bilmiyorsanız lütfen hiç bir koda dokunmayın.
const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton  } = require('discord.js')
const db = require("croxydb")

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
	  if (!interaction.isCommand()) {
		  //butona basıldığında burda hangi işlemleri yapacağınızı belirleyebilirsiniz.
	  } else {
		const command = client.slashcommands.get(interaction.commandName);
		if (!command) return;
		try {
		  await command.execute(client, interaction);
		} catch (error) {
		  console.error('[Slash Command Error]:', error);
		  if (!interaction.replied && !interaction.deferred) {
		    await interaction.reply({ content: 'Komutta bir sorun oluştu lütfen daha sonra tekrar dene.', ephemeral: true }).catch(() => {});
		  }
		}
	  }
    
	},
};
