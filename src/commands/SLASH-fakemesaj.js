module.exports = {
  slash: true,
  name: ['fakemesaj'],
  description: 'Belirttiğiniz kullanıcının ağzından sahte bir mesaj gönderir (Webhook).',
  option: [
    {
      name: 'kullanici',
      description: 'Mesajı yazmış gibi görünecek kullanıcı',
      type: 'user',
      require: true
    },
    {
      name: 'mesaj',
      description: 'Yazdırılacak sahte mesaj',
      type: 'string',
      require: true
    }
  ],
  async execute(client, interaction) {
    if (!interaction.member.permissions.has("MANAGE_WEBHOOKS") && !interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply({ content: "Bu komutu kullanabilmek için `WEBHOOKLARI YÖNET` veya `MESAJLARI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
    }

    const user = interaction.options.getUser('kullanici');
    const msg = interaction.options.getString('mesaj');

    try {
      const hook = await interaction.channel.createWebhook(user.username, {
        avatar: user.displayAvatarURL({ dynamic: true })
      });
      await hook.send({ content: msg });
      setTimeout(() => hook.delete().catch(() => {}), 1500);
      return interaction.reply({ content: "✅ Sahte mesaj başarıyla gönderildi!", ephemeral: true });
    } catch (err) {
      return interaction.reply({ content: `Sahte mesaj gönderilemedi: ${err.message}`, ephemeral: true });
    }
  }
};
