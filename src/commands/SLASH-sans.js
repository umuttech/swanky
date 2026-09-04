const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['sans'],
  description: 'Zar atma, yazı tura, slot ve şans oyunları.',
  subcommands: [
    {
      name: 'zar',
      description: '1 ile 6 arasında rastgele bir zar atar.',
      async execute(client, interaction) {
        const zarlar = ["⚀ 1", "⚁ 2", "⚂ 3", "⚃ 4", "⚄ 5", "⚅ 6"];
        const sonuc = zarlar[Math.floor(Math.random() * zarlar.length)];
        return interaction.reply({ content: `🎲 Zar atıldı: **${sonuc}** geldi!` });
      }
    },
    {
      name: 'yazitura',
      description: 'Madeni para havaya atılır: Yazı mı, Tura mı?',
      async execute(client, interaction) {
        const sonuc = Math.random() < 0.5 ? "🪙 **Yazı**" : "🪙 **Tura**";
        return interaction.reply({ content: `Para havaya atıldı... Sonuç: ${sonuc}!` });
      }
    },
    {
      name: 'slots',
      description: 'Slot makinesini çevirirsiniz.',
      async execute(client, interaction) {
        const meyveler = ["🍎", "🍊", "🍐", "🍋", "🍉", "🍇", "🍒", "💎"];
        const s1 = meyveler[Math.floor(Math.random() * meyveler.length)];
        const s2 = meyveler[Math.floor(Math.random() * meyveler.length)];
        const s3 = meyveler[Math.floor(Math.random() * meyveler.length)];

        let durum = "❌ Maalesef kaybettiniz!";
        if (s1 === s2 && s2 === s3) {
          durum = "🎉 **BÜYÜK İKRAMİYE (JACKPOT)!** Tebrikler üçü de aynı geldi!";
        } else if (s1 === s2 || s2 === s3 || s1 === s3) {
          durum = "✨ **Tebrikler!** İki meyve eşleşti, küçük ödül kazandınız!";
        }

        const embed = new MessageEmbed()
          .setTitle("🎰 Slot Makinesi")
          .setColor(s1 === s2 && s2 === s3 ? "GOLD" : "#3498db")
          .setDescription(`[ ${s1} | ${s2} | ${s3} ]\n\n${durum}`)
          .setFooter({ text: `Oynayan: ${interaction.user.tag}` });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'sayim',
      description: 'Gününüzün şanslı sayısını tahmin eder.',
      async execute(client, interaction) {
        const sayi = Math.floor(Math.random() * 100) + 1;
        return interaction.reply({ content: `🍀 Bugün senin şanslı sayın: **${sayi}**!` });
      }
    },
    {
      name: 'boyolcer',
      description: 'Eğlenceli boy ölçer.',
      options: [
        { name: 'kullanici', description: 'Boyu ölçülecek kullanıcı (opsiyonel)', type: 'user', require: false }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('kullanici') || interaction.user;
        const sayi = Math.floor(Math.random() * 40) + 1;
        return interaction.reply({ content: `📏 **${target.username}** ölçüm sonucu: **${sayi} cm** çıktı! 😅` });
      }
    }
  ]
};
