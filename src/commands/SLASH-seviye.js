const Discord = require("discord.js");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const canvacord = require("canvacord");
const db = require("nrc.db");

module.exports = {
  slash: true,
  name: ['seviye'],
  description: 'Seviye ve rank kartı sistemi.',
  subcommands: [
    {
      name: 'rank',
      description: 'Seviye kartınızı veya bir kullanıcının seviye kartını görüntüler.',
      options: [
        { name: 'kullanici', description: 'Seviyesine bakılacak kullanıcı (opsiyonel)', type: 'user', require: false }
      ],
      async execute(client, interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('kullanici') || interaction.user;
        const gid = interaction.guild.id;
        const xp = Number(db.fetch(`xp_${gid}_${user.id}`)) || 0;
        const lvl = Number(db.fetch(`lvl_${gid}_${user.id}`)) || 0;

        const member = interaction.guild.members.cache.get(user.id);
        const status = member?.presence?.status || "online";

        try {
          const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ format: 'png', size: 512 }))
            .setCurrentXP(xp)
            .setLevel(lvl)
            .setRequiredXP(100)
            .setStatus(status)
            .setProgressBar("#5865F2", "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator === '0' ? '0000' : user.discriminator);

          const data = await rank.build();
          const attachment = new MessageAttachment(data, `rank-${user.id}.png`);
          return interaction.editReply({ files: [attachment] });
        } catch (err) {
          console.error('[Rank Card Error]:', err);
          return interaction.editReply({ content: `📊 **${user.username}** Seviye Bilgileri:\n**Seviye:** ${lvl}\n**Mevcut XP:** ${xp} / 100` });
        }
      }
    },
    {
      name: 'ayarla',
      description: 'Seviye log kanalını veya tebrik mesajını ayarlar.',
      options: [
        {
          name: 'islem',
          description: 'Ayar seçeneği',
          type: 'string',
          require: true,
          choices: [
            { name: 'Mevcut Ayarları Gör', value: 'durum' },
            { name: 'Log Kanalı Ayarla', value: 'log' },
            { name: 'Tebrik Mesajını Aç/Kapat', value: 'tebrik' }
          ]
        },
        { name: 'kanal', description: 'Seviye atlama mesajlarının gideceği kanal (Log için)', type: 'channel', require: false }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const islem = interaction.options.getString('islem');
        const gid = interaction.guild.id;

        if (islem === 'durum') {
          const levellog = db.fetch(`level_log_${gid}`);
          const leveltebrik = db.fetch(`level_tebrik_${gid}`);
          const embed = new MessageEmbed()
            .setTitle("⚙️ Seviye Sistemi Ayarları")
            .setColor("AQUA")
            .addField("Tebrik Mesajı", leveltebrik ? "✅ Açık" : "❌ Kapalı", true)
            .addField("Log Kanalı", levellog ? `<#${levellog}>` : "Ayarlanmamış", true)
            .addField("XP Ayarı", "Mesaj başına 1 XP (Her 100 XP 1 Seviye)", false)
            .setFooter({ text: "SwankyBot Seviye Sistemi" });
          return interaction.reply({ embeds: [embed] });
        }

        if (islem === 'tebrik') {
          const mevcut = db.fetch(`level_tebrik_${gid}`);
          if (mevcut) {
            db.set(`level_tebrik_${gid}`, false);
            return interaction.reply({ content: "❌ Seviye tebrik mesajı başarıyla **kapatıldı**." });
          } else {
            db.set(`level_tebrik_${gid}`, true);
            return interaction.reply({ content: "✅ Seviye tebrik mesajı başarıyla **açıldı**." });
          }
        }

        if (islem === 'log') {
          const kanal = interaction.options.getChannel('kanal');
          if (!kanal) return interaction.reply({ content: "Lütfen bir seviye log kanalı belirtin.", ephemeral: true });
          db.set(`level_log_${gid}`, kanal.id);
          return interaction.reply({ content: `✅ Seviye log kanalı başarıyla <#${kanal.id}> olarak ayarlandı.` });
        }
      }
    }
  ]
};
