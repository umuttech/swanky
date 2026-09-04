const { MessageEmbed } = require("discord.js");
const translate = require("node-google-translate-skidz");

const POPULAR_LANGS = {
  en: "İngilizce",
  de: "Almanca",
  fr: "Fransızca",
  ru: "Rusça",
  es: "İspanyolca",
  it: "İtalyanca",
  ar: "Arapça",
  ja: "Japonca",
  az: "Azerbaycanca"
};

module.exports = {
  slash: true,
  name: ['ceviri'],
  description: 'Google Translate ile metinleri farklı dillere çevirir.',
  option: [
    {
      name: 'metin',
      description: 'Çevrilecek metin',
      type: 'string',
      require: true
    },
    {
      name: 'dil',
      description: 'Çevrilecek hedef dil',
      type: 'string',
      require: true,
      choices: Object.entries(POPULAR_LANGS).map(([k, v]) => ({ name: v, value: k }))
    }
  ],
  async execute(client, interaction) {
    await interaction.deferReply();
    const text = interaction.options.getString('metin');
    const lang = interaction.options.getString('dil');

    try {
      const result = await translate({
        text: text,
        source: 'auto',
        target: lang
      });

      const embed = new MessageEmbed()
        .setTitle("🌐 Google Çeviri")
        .setColor("#4285F4")
        .addField("Orijinal Metin", `\`\`\`${text}\`\`\``)
        .addField(`Çeviri (${POPULAR_LANGS[lang] || lang})`, `\`\`\`${result.translation}\`\`\``)
        .setFooter({ text: "SwankyBot Çeviri" })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    } catch (e) {
      return interaction.editReply({ content: "❌ Çeviri yapılırken bir hata oluştu." });
    }
  }
};
