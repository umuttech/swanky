const { MessageEmbed } = require("discord.js");

const CEVAPLAR = [
  'Kesinlikle öyle.',
  'Kuşkusuz evet.',
  'Evet, kesinlikle.',
  'Buna güvenebilirsin.',
  'Gördüğüm kadarıyla evet.',
  'Büyük olasılıkla.',
  'İşaretler eveti gösteriyor.',
  'Daha sonra tekrar sor.',
  'Şimdi söylemesem daha iyi.',
  'Tahmin edemiyorum...',
  'Konsantre ol ve tekrar sor.',
  'Buna pek güvenme.',
  'Cevabım hayır.',
  'Kaynaklarım hayır diyor.',
  'Görünüşe göre pek iyi değil.',
  'Çok şüpheli.',
  'Büyük olasılıkla hayır.',
  'İçgüdülerim hayır diyor.',
  'Kararsız kaldım, bir daha sormaya ne dersin?'
];

module.exports = {
  slash: true,
  name: ['sor'],
  description: 'Sihirli 8-Ball: Bota bir soru sorarsınız, rastgele bir yanıt verir.',
  option: [
    {
      name: 'soru',
      description: 'Sormak istediğiniz soru',
      type: 'string',
      require: true
    }
  ],
  async execute(client, interaction) {
    const soru = interaction.options.getString('soru');
    const cevap = CEVAPLAR[Math.floor(Math.random() * CEVAPLAR.length)];

    const embed = new MessageEmbed()
      .setTitle("🎱 Sihirli Küre Yanıtladı")
      .setColor("#9b59b6")
      .addField("Soru", `\`\`\`${soru}\`\`\``)
      .addField("Yanıt", `\`\`\`${cevap}\`\`\``)
      .setFooter({ text: `Soran: ${interaction.user.tag}` });

    return interaction.reply({ embeds: [embed] });
  }
};
