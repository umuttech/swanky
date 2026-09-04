const { MessageEmbed, Util } = require("discord.js");

module.exports = {
  slash: true,
  name: ['sunucu'],
  description: 'Sunucu bilgileri, rolleri ve ayarları.',
  subcommands: [
    {
      name: 'bilgi',
      description: 'Sunucunun detaylı bilgilerini ve istatistiklerini görüntüler.',
      async execute(client, interaction) {
        const guild = interaction.guild;
        const verificationLevels = {
          NONE: "Çok Düşük",
          LOW: "Normal",
          MEDIUM: "Yüksek",
          HIGH: "Çok Yüksek",
          VERY_HIGH: "Aşırı Yüksek"
        };
        const boostLevel = {
          NONE: "0. Seviye",
          TIER_1: "1. Seviye",
          TIER_2: "2. Seviye",
          TIER_3: "3. Seviye"
        };

        const roles = guild.roles.cache.size;
        const channels = guild.channels.cache;
        const emojis = guild.emojis.cache;
        const members = guild.members.cache;

        const owner = await client.users.fetch(guild.ownerId).catch(() => null);

        const embed = new MessageEmbed()
          .setAuthor({ name: `Sunucu Bilgisi - ${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
          .setColor("#5865F2")
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .addField("📋 Genel Bilgiler",
            `**Sunucu Adı:** \`${guild.name}\`\n` +
            `**Sunucu ID:** \`${guild.id}\`\n` +
            `**Sunucu Sahibi:** ${owner ? `${owner.tag} (${owner})` : guild.ownerId}\n` +
            `**Bölge/Dil:** \`${guild.preferredLocale}\`\n` +
            `**Kuruluş Tarihi:** <t:${Math.floor(guild.createdTimestamp / 1000)}:F> (<t:${Math.floor(guild.createdTimestamp / 1000)}:R>)`, false)
          .addField("📊 İstatistikler",
            `**Toplam Üye:** \`${guild.memberCount}\` (İnsan: \`${members.filter(m => !m.user.bot).size}\` | Bot: \`${members.filter(m => m.user.bot).size}\`)\n` +
            `**Rol Sayısı:** \`${roles}\`\n` +
            `**Metin Kanalları:** \`${channels.filter(c => c.type === "GUILD_TEXT").size}\`\n` +
            `**Ses Kanalları:** \`${channels.filter(c => c.type === "GUILD_VOICE").size}\`\n` +
            `**Toplam Emoji:** \`${emojis.size}\` (Hareketli: \`${emojis.filter(e => e.animated).size}\`)\n` +
            `**Boost Seviyesi:** \`${boostLevel[guild.premiumTier] || '0. Seviye'}\` (Boost: \`${guild.premiumSubscriptionCount || 0}\`)\n` +
            `**Güvenlik:** \`${verificationLevels[guild.verificationLevel] || 'Normal'}\``, false)
          .setFooter({ text: `Sorgulayan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'resim',
      description: 'Sunucunun profil simgesini (ikonunu) görüntüler.',
      async execute(client, interaction) {
        const icon = interaction.guild.iconURL({ dynamic: true, size: 2048 });
        if (!icon) return interaction.reply({ content: "Bu sunucunun bir simgesi bulunmuyor.", ephemeral: true });

        const embed = new MessageEmbed()
          .setTitle(`${interaction.guild.name} - Sunucu Simgesi`)
          .setColor("#5865F2")
          .setImage(icon)
          .setDescription(`[Görsel Bağlantısı](${icon})`);

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'roller',
      description: 'Sunucuda bulunan tüm rolleri listeler.',
      async execute(client, interaction) {
        const roles = interaction.guild.roles.cache
          .filter(r => r.id !== interaction.guild.id)
          .sort((a, b) => b.position - a.position)
          .map(r => `${r}`)
          .join(', ');

        const embed = new MessageEmbed()
          .setTitle(`🎭 Sunucu Rolleri [${interaction.guild.roles.cache.size - 1}]`)
          .setColor("RANDOM")
          .setDescription(roles.length > 4000 ? roles.slice(0, 3950) + "..." : roles);

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'kurucu',
      description: 'Sunucunun sahibini görüntüler.',
      async execute(client, interaction) {
        const owner = await client.users.fetch(interaction.guild.ownerId).catch(() => null);
        const embed = new MessageEmbed()
          .setTitle("👑 Sunucu Kurucusu")
          .setColor("GOLD")
          .setDescription(`Bu sunucunun kurucusu: **${owner ? owner.tag : interaction.guild.ownerId}** (<@${interaction.guild.ownerId}>)`)
          .setThumbnail(owner ? owner.displayAvatarURL() : interaction.guild.iconURL());
        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'yetkilerim',
      description: 'Sunucudaki mevcut yetkilerinizi görüntüler.',
      async execute(client, interaction) {
        const member = interaction.member;
        const perms = [
          { name: "Yönetici", flag: "ADMINISTRATOR" },
          { name: "Sunucuyu Yönet", flag: "MANAGE_GUILD" },
          { name: "Rolleri Yönet", flag: "MANAGE_ROLES" },
          { name: "Kanalları Yönet", flag: "MANAGE_CHANNELS" },
          { name: "Üyeleri At (Kick)", flag: "KICK_MEMBERS" },
          { name: "Üyeleri Yasakla (Ban)", flag: "BAN_MEMBERS" },
          { name: "Mesajları Yönet", flag: "MANAGE_MESSAGES" },
          { name: "Emojileri Yönet", flag: "MANAGE_EMOJIS_AND_STICKERS" },
          { name: "Zaman Aşımı Uygula", flag: "MODERATE_MEMBERS" }
        ];

        const list = perms.map(p => {
          const has = member.permissions.has(p.flag);
          return `${has ? "✅" : "❌"} **${p.name}**`;
        }).join('\n');

        const embed = new MessageEmbed()
          .setTitle(`🛡️ ${interaction.user.username} - Yetkileriniz`)
          .setColor("#2ecc71")
          .setDescription(list)
          .setFooter({ text: "SwankyBot İzin Kontrolü" });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'emoji-ekle',
      description: 'Sunucuya özel bir emoji ekler.',
      options: [
        { name: 'emoji', description: 'Eklemek istediğiniz emoji veya emoji linki', type: 'string', require: true },
        { name: 'isim', description: 'Emojiye verilecek isim (opsiyonel)', type: 'string', require: false }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `EMOJİLERİ YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const emojiStr = interaction.options.getString('emoji');
        const customName = interaction.options.getString('isim');

        const customEmoji = Util.parseEmoji(emojiStr);
        if (customEmoji && customEmoji.id) {
          const ext = customEmoji.animated ? "gif" : "png";
          const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${ext}`;
          const name = customName || customEmoji.name;

          try {
            const added = await interaction.guild.emojis.create(link, name);
            return interaction.reply({ content: `✅ <${added.animated ? 'a' : ''}:${added.name}:${added.id}> isimli emoji başarıyla sunucuya eklendi!` });
          } catch (err) {
            return interaction.reply({ content: `❌ Emoji eklenirken bir hata oluştu: ${err.message}`, ephemeral: true });
          }
        } else if (emojiStr.startsWith("http")) {
          try {
            const added = await interaction.guild.emojis.create(emojiStr, customName || "yeni_emoji");
            return interaction.reply({ content: `✅ <${added.animated ? 'a' : ''}:${added.name}:${added.id}> isimli emoji başarıyla eklendi!` });
          } catch (err) {
            return interaction.reply({ content: `❌ Emoji eklenemedi: ${err.message}`, ephemeral: true });
          }
        } else {
          return interaction.reply({ content: "Lütfen başka bir sunucudan özel bir emoji veya geçerli bir görsel bağlantısı (URL) girin.", ephemeral: true });
        }
      }
    }
  ]
};
