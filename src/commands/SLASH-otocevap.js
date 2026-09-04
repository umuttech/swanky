const { MessageEmbed } = require("discord.js");
const db = require("croxydb");

module.exports = {
  slash: true,
  name: ['otocevap'],
  description: 'Özel otomatik cevap ekleme ve silme sistemi.',
  subcommands: [
    {
      name: 'ekle',
      description: 'Birisi belirtilen kelimeyi yazdığında botun vereceği cevabı ayarlar.',
      options: [
        { name: 'mesaj', description: 'Kullanıcının yazacağı tetikleyici mesaj', type: 'string', require: true },
        { name: 'cevap', description: 'Botun vereceği yanıt', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const cmd = interaction.options.getString('mesaj').toLowerCase().trim();
        const cmdAnswer = interaction.options.getString('cevap');
        const gid = interaction.guild.id;

        const data = db.fetch(`otocevapp_${cmd}_${gid}`);
        if (data) return interaction.reply({ content: `Bu kelime (\`${cmd}\`) için zaten bir otomatik cevap ayarlanmış!`, ephemeral: true });

        db.set(`otocevapp_${cmd}_${gid}`, { cmd: cmd, answer: cmdAnswer });

        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("✅ Otomatik Cevap Kaydedildi!")
          .setDescription(`Artık birisi **\`${cmd}\`** yazdığında bot:\n> "${cmdAnswer}"\nşeklinde cevap verecek.`)
          .setFooter({ text: `Silmek için: /otocevap sil mesaj:${cmd}` });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'sil',
      description: 'Daha önce ayarlanmış bir otomatik cevabı siler.',
      options: [
        { name: 'mesaj', description: 'Silinecek tetikleyici kelime', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const cmd = interaction.options.getString('mesaj').toLowerCase().trim();
        const gid = interaction.guild.id;

        const data = db.fetch(`otocevapp_${cmd}_${gid}`);
        if (!data) return interaction.reply({ content: `\`${cmd}\` adında kayıtlı bir otomatik cevap bulunamadı.`, ephemeral: true });

        db.delete(`otocevapp_${cmd}_${gid}`);
        return interaction.reply({ content: `🗑️ \`${cmd}\` kelimesi için ayarlanmış otomatik cevap başarıyla silindi.` });
      }
    }
  ]
};
