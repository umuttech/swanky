const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  slash: true,
  name: ['ban'],
  description: 'Sunucu yasaklama (ban) ve yasaklılar listesi yönetimi.',
  subcommands: [
    {
      name: 'at',
      description: 'Belirttiğiniz kullanıcıyı sunucudan yasaklar.',
      options: [
        { name: 'kullanici', description: 'Yasaklanacak kullanıcı', type: 'user', require: true },
        { name: 'sebep', description: 'Yasaklama sebebi', type: 'string', require: false }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ÜYELERİ YASAKLA` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanici');
        const sebep = interaction.options.getString('sebep') || "Sebep belirtilmedi.";

        if (targetUser.id === interaction.member.id) return interaction.reply({ content: "Kendinizi yasaklayamazsınız.", ephemeral: true });
        if (targetUser.id === client.user.id) return interaction.reply({ content: "Beni yasaklayamazsınız.", ephemeral: true });
        if (targetUser.id === interaction.guild.ownerId) return interaction.reply({ content: "Sunucu sahibini yasaklayamazsınız.", ephemeral: true });

        const member = interaction.guild.members.cache.get(targetUser.id);
        if (member && !member.bannable) {
          return interaction.reply({ content: "Bu kullanıcıyı yasaklamaya yetkim yetmiyor (rolü benim rolümden yüksek olabilir).", ephemeral: true });
        }

        try {
          await interaction.guild.members.ban(targetUser.id, { reason: sebep });
          const embed = new MessageEmbed()
            .setTitle("🔨 Kullanıcı Yasaklandı")
            .setColor("RED")
            .setDescription(`**Yasaklanan:** ${targetUser.tag} (\`${targetUser.id}\`)\n**Yasaklayan:** ${interaction.user}\n**Sebep:** \`${sebep}\``)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
          return interaction.reply({ embeds: [embed] });
        } catch (e) {
          return interaction.reply({ content: `Yasaklama başarısız oldu: ${e.message}`, ephemeral: true });
        }
      }
    },
    {
      name: 'force',
      description: 'Sunucuda olmayan bir kullanıcıyı ID ile yasaklar.',
      options: [
        { name: 'kullanici_id', description: 'Yasaklanacak kullanıcının IDsi', type: 'string', require: true },
        { name: 'sebep', description: 'Yasaklama sebebi', type: 'string', require: false }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ÜYELERİ YASAKLA` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const userId = interaction.options.getString('kullanici_id');
        const sebep = interaction.options.getString('sebep') || "Forceban";

        try {
          await interaction.guild.members.ban(userId, { reason: sebep });
          return interaction.reply({ content: `🔨 \`${userId}\` ID'li kullanıcı başarıyla sunucudan yasaklandı!` });
        } catch (e) {
          return interaction.reply({ content: `Yasaklama başarısız oldu: ${e.message}`, ephemeral: true });
        }
      }
    },
    {
      name: 'say',
      description: 'Sunucudaki toplam yasaklı kullanıcı sayısını gösterir.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ÜYELERİ YASAKLA` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const bans = await interaction.guild.bans.fetch().catch(() => null);
        const count = bans ? bans.size : 0;
        return interaction.reply({ content: `📊 Bu sunucuda şu anda **${count}** yasaklı kullanıcı bulunuyor.` });
      }
    },
    {
      name: 'liste',
      description: 'Sunucuda yasaklanan son kullanıcıları listeler.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ÜYELERİ YASAKLA` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        await interaction.deferReply();
        const bans = await interaction.guild.bans.fetch().catch(() => null);
        if (!bans || bans.size === 0) {
          return interaction.editReply({ content: "Bu sunucuda yasaklanmış kullanıcı bulunmuyor." });
        }

        const list = bans.map(b => `• **${b.user.tag}** (\`${b.user.id}\`) - Sebep: ${b.reason || 'Belirtilmedi'}`).slice(0, 20).join('\n');
        const embed = new MessageEmbed()
          .setTitle(`🚫 Yasaklı Kullanıcılar [${bans.size}]`)
          .setColor("RED")
          .setDescription(list)
          .setFooter({ text: "İlk 20 yasak gösterilmektedir." });

        return interaction.editReply({ embeds: [embed] });
      }
    }
  ]
};