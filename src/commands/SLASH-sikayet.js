const { MessageEmbed } = require("discord.js");
const ayarlar = require("../base/settings.json");

module.exports = {
  slash: true,
  name: ['sikayet'],
  description: 'Bot geliştiricisine şikayet, istek veya öneri bildirirsiniz.',
  option: [
    {
      name: 'mesaj',
      description: 'İletmek istediğiniz şikayet veya öneriniz',
      type: 'string',
      require: true
    }
  ],
  async execute(client, interaction) {
    const mesaj = interaction.options.getString('mesaj');
    const logKanalId = ayarlar.sikayet;

    const embed = new MessageEmbed()
      .setTitle("📩 Yeni Bir Şikayet / Öneri Geldi!")
      .setColor("ORANGE")
      .addField("Kullanıcı", `${interaction.user.tag} (\`${interaction.user.id}\`)`, true)
      .addField("Sunucu", `${interaction.guild.name} (\`${interaction.guild.id}\`)`, true)
      .addField("Mesaj", mesaj, false)
      .setThumbnail(interaction.user.displayAvatarURL())
      .setTimestamp();

    if (logKanalId) {
      const channel = client.channels.cache.get(logKanalId);
      if (channel) await channel.send({ embeds: [embed] }).catch(() => {});
    }

    return interaction.reply({ content: "✅ Şikayetiniz / öneriniz başarıyla bot yapımcılarına iletildi. Geri bildiriminiz için teşekkür ederiz!", ephemeral: true });
  }
};
