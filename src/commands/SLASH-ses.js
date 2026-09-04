const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['ses'],
  description: 'Ses kanalı yönetim komutları (çek, bağlantı kes).',
  subcommands: [
    {
      name: 'cek',
      description: 'Belirttiğiniz kullanıcıyı bulunduğunuz ses kanalına taşır.',
      options: [
        { name: 'kullanici', description: 'Yanınıza taşınacak üye', type: 'user', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MOVE_MEMBERS")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ÜYELERİ TAŞI` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const voiceChannel = interaction.member.voice?.channel;
        if (!voiceChannel) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için önce bir ses kanalında olmalısınız.", ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanici');
        const targetMember = interaction.guild.members.cache.get(targetUser.id);
        if (!targetMember || !targetMember.voice?.channel) {
          return interaction.reply({ content: "Belirtilen kullanıcı herhangi bir ses kanalında bulunmuyor.", ephemeral: true });
        }

        try {
          await targetMember.voice.setChannel(voiceChannel.id);
          return interaction.reply({ content: `✅ ${targetMember} başarıyla bulunduğunuz **${voiceChannel.name}** kanalına taşındı.` });
        } catch (e) {
          return interaction.reply({ content: `Kullanıcı taşınamadı: ${e.message}`, ephemeral: true });
        }
      }
    },
    {
      name: 'kes',
      description: 'Belirttiğiniz üyenin ses bağlantısını keser.',
      options: [
        { name: 'kullanici', description: 'Sesten atılacak üye', type: 'user', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MOVE_MEMBERS")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ÜYELERİ TAŞI` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanici');
        const targetMember = interaction.guild.members.cache.get(targetUser.id);
        if (!targetMember || !targetMember.voice?.channel) {
          return interaction.reply({ content: "Belirtilen kullanıcı herhangi bir ses kanalında bulunmuyor.", ephemeral: true });
        }

        try {
          await targetMember.voice.disconnect();
          return interaction.reply({ content: `✅ ${targetMember} adlı kullanıcının ses bağlantısı başarıyla kesildi.` });
        } catch (e) {
          return interaction.reply({ content: `Ses bağlantısı kesilemedi: ${e.message}`, ephemeral: true });
        }
      }
    }
  ]
};
