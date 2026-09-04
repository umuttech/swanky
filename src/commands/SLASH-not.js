const { MessageEmbed } = require("discord.js");
const db = require("croxydb");

module.exports = {
  slash: true,
  name: ['not'],
  description: 'Kişisel not defteri sistemi.',
  subcommands: [
    {
      name: 'al',
      description: 'Kendinize özel bir not kaydedersiniz.',
      options: [
        { name: 'metin', description: 'Kaydedilecek not metni', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        const not = interaction.options.getString('metin');
        db.set(`not_${interaction.user.id}`, not);
        return interaction.reply({ content: `✅ Notunuz başarıyla kaydedildi:\n> "${not}"`, ephemeral: true });
      }
    },
    {
      name: 'gor',
      description: 'Kaydedilmiş olan notunuzu görüntülersiniz.',
      async execute(client, interaction) {
        const not = db.fetch(`not_${interaction.user.id}`);
        if (!not) {
          return interaction.reply({ content: "Henüz kaydedilmiş bir notunuz bulunmuyor. `/not al` ile not alabilirsiniz.", ephemeral: true });
        }

        const embed = new MessageEmbed()
          .setTitle(`📝 ${interaction.user.username} - Kayıtlı Notunuz`)
          .setColor("#f1c40f")
          .setDescription(not)
          .setFooter({ text: "Silmek için: /not sifirla" });

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
    },
    {
      name: 'sifirla',
      description: 'Kayıtlı notunuzu siler.',
      async execute(client, interaction) {
        db.delete(`not_${interaction.user.id}`);
        return interaction.reply({ content: "🗑️ Kayıtlı notunuz başarıyla silindi.", ephemeral: true });
      }
    }
  ]
};
