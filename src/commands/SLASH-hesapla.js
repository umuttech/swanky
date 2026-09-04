const { MessageEmbed } = require("discord.js");
const math = require("math-expression-evaluator");

module.exports = {
  slash: true,
  name: ['hesapla'],
  description: 'Belirttiğiniz matematiksel işlemi hesaplar.',
  option: [
    {
      name: 'islem',
      description: 'Hesaplanacak matematik işlemi (Örn: 25 * 4 + 10)',
      type: 'string',
      require: true
    }
  ],
  async execute(client, interaction) {
    const islem = interaction.options.getString('islem');
    let sonuc;

    try {
      sonuc = math.eval(islem);
    } catch (e) {
      return interaction.reply({ content: "❌ Geçersiz işlem! Lütfen geçerli bir matematiksel ifade giriniz.", ephemeral: true });
    }

    const embed = new MessageEmbed()
      .setTitle("🧮 Hesaplama Sonucu")
      .setColor("AQUA")
      .addField("İşlem", `\`\`\`${islem}\`\`\``)
      .addField("Sonuç", `\`\`\`${sonuc}\`\`\``)
      .setFooter({ text: `Hesaplayan: ${interaction.user.tag}` });

    return interaction.reply({ embeds: [embed] });
  }
};
