module.exports = {
  slash: true,
  name: ['tersyazi'],
  description: 'Yazdığınız metni tersten yazar.',
  option: [
    {
      name: 'metin',
      description: 'Tersine çevrilecek metin',
      type: 'string',
      require: true
    }
  ],
  async execute(client, interaction) {
    const metin = interaction.options.getString('metin');
    const ters = metin.split('').reverse().join('');
    return interaction.reply({ content: `🔄 ${ters}` });
  }
};
