const figlet = require("figlet");

module.exports = {
  slash: true,
  name: ['ascii'],
  description: 'Yazdığınız metni ASCII sanatına dönüştürür.',
  option: [
    {
      name: 'yazi',
      description: 'ASCII sanatına çevrilecek metin',
      type: 'string',
      require: true
    },
    {
      name: 'stil',
      description: 'Font stili',
      type: 'string',
      require: false,
      choices: [
        { name: 'Standart Font', value: 'Standard' },
        { name: 'Dans Eden Font', value: 'Dancing Font' },
        { name: 'Slant', value: 'Slant' },
        { name: 'Ghost', value: 'Ghost' }
      ]
    }
  ],
  async execute(client, interaction) {
    const yazi = interaction.options.getString('yazi');
    const font = interaction.options.getString('stil') || 'Standard';

    if (yazi.length > 20) {
      return interaction.reply({ content: "Lütfen en fazla 20 karakter uzunluğunda bir metin girin!", ephemeral: true });
    }

    figlet(yazi, { font: font }, (err, data) => {
      if (err || !data) {
        return interaction.reply({ content: "ASCII metni oluşturulurken bir hata oluştu.", ephemeral: true });
      }
      return interaction.reply({ content: `\`\`\`css\n${data}\n\`\`\`` });
    });
  }
};
