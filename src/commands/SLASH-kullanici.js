const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  slash: true,
  name: ['kullanici'],
  description: 'Kullanıcı profil bilgisi, banner ve isim değiştirme komutları.',
  subcommands: [
    {
      name: 'bilgi',
      description: 'Sizin veya belirttiğiniz kullanıcının detaylı profil bilgilerini gösterir.',
      options: [
        { name: 'kullanici', description: 'Bilgilerine bakılacak kullanıcı (opsiyonel)', type: 'user', require: false }
      ],
      async execute(client, interaction) {
        const user = interaction.options.getUser('kullanici') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const roles = member ? member.roles.cache.filter(r => r.id !== interaction.guild.id).map(r => `${r}`).join(', ') : "Sunucuda değil";

        const embed = new MessageEmbed()
          .setTitle(`👤 ${user.tag} Kullanıcı Bilgisi`)
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setColor(member?.displayHexColor && member.displayHexColor !== '#000000' ? member.displayHexColor : "#5865F2")
          .addField("Kullanıcı Bilgileri",
            `**Kullanıcı Adı:** \`${user.username}\`\n` +
            `**ID:** \`${user.id}\`\n` +
            `**Hesap Kuruluş Tarihi:** <t:${Math.floor(user.createdTimestamp / 1000)}:F> (<t:${Math.floor(user.createdTimestamp / 1000)}:R>)`, false);

        if (member) {
          const siralama = interaction.guild.members.cache.filter(m => m.joinedTimestamp < member.joinedTimestamp).size + 1;
          embed.addField("Sunucu Bilgileri",
            `**Sunucuya Katılma Tarihi:** <t:${Math.floor(member.joinedTimestamp / 1000)}:F>\n` +
            `**Katılım Sırası:** ${siralama}. üye\n` +
            `**Rolleri:** ${roles.length > 1000 ? roles.slice(0, 950) + "..." : (roles || "Rolü Yok")}`, false);
        }

        embed.setFooter({ text: client.user.username, iconURL: client.user.avatarURL() }).setTimestamp();
        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'banner',
      description: 'Bir kullanıcının Discord profil afişini (bannerını) görüntüler.',
      options: [
        { name: 'kullanici', description: 'Afişine bakılacak kullanıcı (opsiyonel)', type: 'user', require: false }
      ],
      async execute(client, interaction) {
        await interaction.deferReply();
        const target = interaction.options.getUser('kullanici') || interaction.user;

        try {
          // Fetch full user with banner
          const fullUser = await client.users.fetch(target.id, { force: true });
          const bannerUrl = fullUser.bannerURL({ dynamic: true, size: 2048 });

          if (!bannerUrl) {
            return interaction.editReply({ content: `**${target.username}** kullanıcısının ayarlanmış bir profil afişi (bannerı) bulunmuyor.` });
          }

          const embed = new MessageEmbed()
            .setTitle(`🖼️ ${target.username} - Profil Afişi`)
            .setColor("RANDOM")
            .setImage(bannerUrl)
            .setDescription(`[Afiş Bağlantısı](${bannerUrl})`);

          return interaction.editReply({ embeds: [embed] });
        } catch (err) {
          return interaction.editReply({ content: "Afiş alınırken bir hata oluştu." });
        }
      }
    },
    {
      name: 'isim-degis',
      description: 'Belirttiğiniz kullanıcının sunucudaki takma adını değiştirir.',
      options: [
        { name: 'kullanici', description: 'İsmi değiştirilecek üye', type: 'user', require: true },
        { name: 'yeni_isim', description: 'Verilecek yeni isim', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_NICKNAMES")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `KULLANICI ADLARINI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const target = interaction.options.getUser('kullanici');
        const yeniIsim = interaction.options.getString('yeni_isim');
        const member = interaction.guild.members.cache.get(target.id);
        if (!member) return interaction.reply({ content: "Kullanıcı sunucuda bulunamadı.", ephemeral: true });

        try {
          await member.setNickname(yeniIsim);
          return interaction.reply({ content: `✅ ${member} adlı kullanıcının ismi başarıyla **${yeniIsim}** olarak değiştirildi.` });
        } catch (e) {
          return interaction.reply({ content: "Kullanıcının ismi değiştirilemedi, kullanıcının rolü botun rolünden yüksek olabilir.", ephemeral: true });
        }
      }
    }
  ]
};
