const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['yaz'],
  description: 'Bota belirttiğiniz metni normal, embed veya spoilerli yazdırırsınız.',
  option: [
    {
      name: 'metin',
      description: 'Botun yazmasını istediğiniz metin',
      type: 'string',
      require: true
    },
    {
      name: 'bicim',
      description: 'Mesajın görünüm biçimi',
      type: 'string',
      require: false,
      choices: [
        { name: 'Normal Mesaj', value: 'normal' },
        { name: 'Embed Mesaj', value: 'embed' },
        { name: 'Spoiler Mesaj', value: 'spoiler' }
      ]
    }
  ],
  async execute(client, interaction) {
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply({ content: "Bu komutu kullanabilmek için `MESAJLARI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
    }

    const metin = interaction.options.getString('metin');
    const bicim = interaction.options.getString('bicim') || 'normal';

    if (bicim === 'embed') {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(metin)
        .setFooter({ text: `Yazdıran: ${interaction.user.tag}` });
      await interaction.channel.send({ embeds: [embed] });
      return interaction.reply({ content: "✅ Mesaj embed olarak gönderildi.", ephemeral: true });
    } else if (bicim === 'spoiler') {
      await interaction.channel.send({ content: `|| ${metin} ||` });
      return interaction.reply({ content: "✅ Mesaj spoiler olarak gönderildi.", ephemeral: true });
    } else {
      await interaction.channel.send({ content: metin });
      return interaction.reply({ content: "✅ Mesaj normal olarak gönderildi.", ephemeral: true });
    }
  }
};
