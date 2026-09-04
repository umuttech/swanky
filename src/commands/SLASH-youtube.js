const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  slash: true,
  name: ['youtube'],
  description: 'Ses kanalında YouTube Birlikte İzle (Watch Together) aktivitesi başlatır.',
  async execute(client, interaction) {
    const voiceChannel = interaction.member.voice?.channel;
    if (!voiceChannel) {
      return interaction.reply({ content: "Bu komutu kullanabilmek için önce bir ses kanalında olmalısınız!", ephemeral: true });
    }

    try {
      const token = process.env.TOKEN || client.token;
      const res = await fetch(`https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
          max_age: 86400,
          max_uses: 0,
          target_application_id: "880218394199220334",
          target_type: 2,
          temporary: false,
          validate: null
        }),
        headers: {
          "Authorization": `Bot ${token}`,
          "Content-Type": "application/json"
        }
      });

      const invite = await res.json();
      if (!invite.code) {
        return interaction.reply({ content: "YouTube Together daveti oluşturulamadı.", ephemeral: true });
      }

      const button = new MessageButton()
        .setLabel("YouTube Birlikte İzle'ye Katıl")
        .setStyle("LINK")
        .setURL(`https://discord.gg/${invite.code}`);

      const row = new MessageActionRow().addComponents(button);

      const embed = new MessageEmbed()
        .setTitle("📺 YouTube Birlikte İzle")
        .setColor("RED")
        .setDescription(`**${voiceChannel.name}** ses kanalında YouTube etkinliği başlatıldı!\nAşağıdaki butona tıklayarak katılabilirsiniz.`)
        .setFooter({ text: "SwankyBot YouTube Together" });

      return interaction.reply({ embeds: [embed], components: [row] });
    } catch (err) {
      return interaction.reply({ content: `Hata oluştu: ${err.message}`, ephemeral: true });
    }
  }
};
