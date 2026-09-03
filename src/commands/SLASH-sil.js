const { Permissions,Client,CommandInteraction } = require("discord.js");

module.exports = {
  slash: true,
  name: ['sil'],
  description: "Beliritlen Miktarda Mesajı siler.",
  option: [
    {
      name: "miktar",
      type: 'number',
      description: "Kaç Mesaj silinicek?",
      require: true,
    },
  ],
  async execute(client, interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return interaction.reply({content: `Bu komutu kullanamazsın.`, ephemeral: true});
    const clear = interaction.options.getNumber("miktar");
    const channel = interaction.channel;

    let math = Math.floor(clear / 100);
    for (let i = 0; i < math; i++) {
      try {
        await channel.bulkDelete(100);
      } catch (err) {}
    }

    try {
      await channel.bulkDelete(clear - 100 * math);
    } catch (err) {}

    try {
        interaction.reply({ content: `<a:armors_onay1:990609433816092692> \`${clear}\` tane mesaj silindi` });
        setTimeout(() => {
      interaction.deleteReply();
        }, 10000);
    } catch {}
  },
};