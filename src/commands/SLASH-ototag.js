const { MessageEmbed } = require("discord.js");
const db = require("croxydb");

module.exports = {
  slash: true,
  name: ['ototag'],
  description: 'Sunucuya yeni girenlere veya mevcut üyelere otomatik tag sistemi.',
  subcommands: [
    {
      name: 'ayarla',
      description: 'Sunucuya yeni katılanların isminin başına eklenecek tagı ayarlar.',
      options: [
        { name: 'tag', description: 'Ayarlanacak tag metni', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const tag = interaction.options.getString('tag');
        db.set(`ototagg_${interaction.guild.id}`, tag);

        return interaction.reply({ content: `✅ Otomatik tag başarıyla \`${tag}\` olarak ayarlandı! Sunucuya yeni girenlerin isminin başına eklenecektir.` });
      }
    },
    {
      name: 'sifirla',
      description: 'Otomatik tag ayarını sıfırlar.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        db.delete(`ototagg_${interaction.guild.id}`);
        return interaction.reply({ content: "🗑️ Otomatik tag sistemi başarıyla sıfırlandı." });
      }
    },
    {
      name: 'herkese-ver',
      description: 'Sunucudaki tüm üyelerin isimlerinin başına belirtilen tagı ekler.',
      options: [
        { name: 'tag', description: 'Eklenecek tag metni', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        await interaction.deferReply();
        const tag = interaction.options.getString('tag');

        let degisen = 0;
        const members = await interaction.guild.members.fetch();
        for (const [id, member] of members) {
          if (!member.user.bot && member.manageable) {
            if (!member.displayName.startsWith(tag)) {
              await member.setNickname(`${tag} ${member.displayName}`).catch(() => {});
              degisen++;
            }
          }
        }

        return interaction.editReply({ content: `✅ İşlem tamamlandı! Toplam **${degisen}** üyenin ismine \`${tag}\` eklendi.` });
      }
    }
  ]
};
