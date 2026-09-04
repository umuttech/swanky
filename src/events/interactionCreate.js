//burasının ne olduğunu bilmiyorsanız lütfen hiç bir koda dokunmayın.
const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton  } = require('discord.js')
const db = require("croxydb")

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isCommand()) {
			// butona basıldığında veya menü seçiminde burda işlemler yapılabilir.
			return;
		}

		const command = client.slashcommands.get(interaction.commandName);
		if (!command) return;

		try {
			// Subcommand kontrolü ve yönlendirmesi
			let subName = null;
			try {
				subName = interaction.options.getSubcommand(false);
			} catch (e) {
				subName = null;
			}

			if (subName && command.subcommands && Array.isArray(command.subcommands)) {
				const subCmd = command.subcommands.find(s => s.name === subName);
				if (subCmd && typeof subCmd.execute === 'function') {
					return await subCmd.execute(client, interaction);
				}
			}

			if (typeof command.execute === 'function') {
				await command.execute(client, interaction);
			}
		} catch (error) {
			console.error(`[Slash Komut Hatası - /${interaction.commandName}]:`, error);
			if (!interaction.replied && !interaction.deferred) {
				await interaction.reply({ content: 'Komutta bir sorun oluştu lütfen daha sonra tekrar dene.', ephemeral: true }).catch(() => {});
			} else if (interaction.deferred && !interaction.replied) {
				await interaction.editReply({ content: 'Komut çalıştırılırken bir sorun oluştu.' }).catch(() => {});
			}
		}
	},
};
