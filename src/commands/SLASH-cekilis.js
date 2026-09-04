const { MessageEmbed } = require("discord.js");
const db = require("croxydb");

module.exports = {
  slash: true,
  name: ['cekilis'],
  description: 'Gelişmiş çekiliş sistemi.',
  subcommands: [
    {
      name: 'baslat',
      description: 'Yeni bir çekiliş başlatma penceresi açar.',
      async execute(client, interaction) {
        // Modal index.js içerisindeki interactionCreate dinleyicisi tarafından gösterilir.
      }
    },
    {
      name: 'bitir',
      description: 'Devam eden bir çekilişi anında sonlandırır.',
      options: [
        { name: 'mesaj', description: 'Çekiliş mesajının IDsi', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `SUNUCUYU YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const key = interaction.options.getString('mesaj');
        const data = db.fetch(`cekilis_${key}`);
        if (!data) return interaction.reply({ content: "Böyle bir çekiliş bulunamadı veya çekiliş zaten bitmiş!", ephemeral: true });

        try {
          const mesaj = await interaction.channel.messages.fetch(data.mesajid || key);
          const kullanicilar = db.fetch(`user_${data.mesajid || key}`);
          if (!kullanicilar || kullanicilar.length === 0) {
            return interaction.reply({ content: "Yeterli katılımcı bulunamadı.", ephemeral: true });
          }

          const kazanan = kullanicilar[Math.floor(Math.random() * kullanicilar.length)];
          const embed = new MessageEmbed()
            .setTitle(data.odul || "Çekiliş Sona Erdi")
            .setColor("AQUA")
            .setTimestamp()
            .setDescription(`
${data.acıklama || ''}

Sona Erdi: <t:${Math.floor(Date.now() / 1000)}:R>
Düzenleyen: <@${data.hosted}>
🎉 **Kazanan:** <@${kazanan}>
👥 **Katılımcı Sayısı:** **${kullanicilar.length}**`);

          await mesaj.edit({ embeds: [embed], components: [] });
          db.delete(`cekilis_${interaction.channel.id}`);
          db.set(`son_${mesaj.id}`, true);
          await interaction.channel.send(`🎉 Tebrikler <@${kazanan}>! **${data.odul || 'Ödül'}** kazandın!`);
          return interaction.reply({ content: "✅ Çekiliş başarıyla sonlandırıldı.", ephemeral: true });
        } catch (e) {
          console.error('[Çekiliş Bitir Hatası]:', e);
          return interaction.reply({ content: "Çekiliş mesajı bulunamadı veya bir hata oluştu.", ephemeral: true });
        }
      }
    },
    {
      name: 'yenile',
      description: 'Sona ermiş bir çekiliş için yeniden kazanan (reroll) belirler.',
      options: [
        { name: 'mesaj', description: 'Çekiliş mesajının IDsi', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `SUNUCUYU YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const key = interaction.options.getString('mesaj');
        const sonaerdimi = db.fetch(`son_${key}`);
        if (!sonaerdimi) return interaction.reply({ content: "Bu çekiliş henüz sona ermemiş veya bulunamadı!", ephemeral: true });

        const kullanicilar = db.fetch(`user_${key}`);
        if (!kullanicilar || kullanicilar.length === 0) {
          return interaction.reply({ content: "Yeterli katılımcı bulunamadı.", ephemeral: true });
        }

        const kazanan = kullanicilar[Math.floor(Math.random() * kullanicilar.length)];
        const odul = db.fetch(`cekilis_${key}`) || 'Ödül';

        await interaction.channel.send(`🎉 Tebrikler <@${kazanan}>! Çekiliş yeniden çekildi ve **${odul}** kazandın!`);
        return interaction.reply({ content: "✅ Çekiliş başarıyla yenilendi!", ephemeral: true });
      }
    }
  ]
};
