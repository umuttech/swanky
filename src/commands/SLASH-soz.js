const { MessageEmbed } = require("discord.js");

const ESPRILER = [];
const ILTIFATLAR = [];
const TEKERLEMELER = [];

module.exports = {
  slash: true,
  name: ['soz'],
  description: 'Rastgele espri, iltifat veya tekerleme gönderir.',
  subcommands: [
    {
      name: 'espri',
      description: 'Rastgele bir soğuk espri yapar.',
      async execute(client, interaction) {
        const espri = ESPRILER[Math.floor(Math.random() * ESPRILER.length)];
        const embed = new MessageEmbed()
          .setTitle("😂 Soğuk Espri Vakti")
          .setColor("RANDOM")
          .setDescription(`> ${espri}`)
          .setFooter({ text: "SwankyBot Eğlence" });
        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'iltifat',
      description: 'Bir kullanıcıya veya kendinize güzel bir iltifat gönderir.',
      options: [
        { name: 'kullanici', description: 'İltifat edilecek kullanıcı (opsiyonel)', type: 'user', require: false }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('kullanici') || interaction.user;
        const iltifat = ILTIFATLAR[Math.floor(Math.random() * ILTIFATLAR.length)];
        const embed = new MessageEmbed()
          .setTitle("💖 Günün İltifatı")
          .setColor("LUMINOUS_VIVID_PINK")
          .setDescription(`${target}, ${iltifat}`)
          .setFooter({ text: `İltifat Eden: ${interaction.user.tag}` });
        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'tekerleme',
      description: 'Rastgele zor bir tekerleme gönderir.',
      async execute(client, interaction) {
        const tekerleme = TEKERLEMELER[Math.floor(Math.random() * TEKERLEMELER.length)];
        const embed = new MessageEmbed()
          .setTitle("👅 Tekerleme Vakti")
          .setColor("AQUA")
          .setDescription(`> ${tekerleme}`)
          .setFooter({ text: "Hadi bakalım, takılmadan 3 kez hızlıca oku!" });
        return interaction.reply({ embeds: [embed] });
      }
    }
  ]
};
