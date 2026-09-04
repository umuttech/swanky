const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ['kanal'],
  description: 'Kanal oluşturma, düzenleme ve bilgi komutları.',
  subcommands: [
    {
      name: 'yazi-ac',
      description: 'Sunucuda yeni bir metin (yazı) kanalı açar.',
      options: [
        { name: 'isim', description: 'Açılacak kanalın adı', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `KANALLARI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const isim = interaction.options.getString('isim');
        const channel = await interaction.guild.channels.create(isim, { type: "GUILD_TEXT" });
        return interaction.reply({ content: `✅ <#${channel.id}> isimli metin kanalı başarıyla oluşturuldu!` });
      }
    },
    {
      name: 'ses-ac',
      description: 'Sunucuda yeni bir ses kanalı açar.',
      options: [
        { name: 'isim', description: 'Açılacak ses kanalının adı', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `KANALLARI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const isim = interaction.options.getString('isim');
        const channel = await interaction.guild.channels.create(isim, { type: "GUILD_VOICE" });
        return interaction.reply({ content: `✅ **${channel.name}** isimli ses kanalı başarıyla oluşturuldu!` });
      }
    },
    {
      name: 'isim-degis',
      description: 'Belirtilen kanalın adını değiştirir.',
      options: [
        { name: 'kanal', description: 'İsmi değiştirilecek kanal', type: 'channel', require: true },
        { name: 'yeni_isim', description: 'Kanalın yeni adı', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `KANALLARI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const kanal = interaction.options.getChannel('kanal');
        const yeniIsim = interaction.options.getString('yeni_isim');
        await kanal.setName(yeniIsim);
        return interaction.reply({ content: `✅ Kanal adı başarıyla **${yeniIsim}** olarak güncellendi.` });
      }
    },
    {
      name: 'aciklama',
      description: 'Belirtilen metin kanalının açıklamasını/konusunu (topic) değiştirir.',
      options: [
        { name: 'kanal', description: 'Açıklaması değiştirilecek kanal', type: 'channel', require: true },
        { name: 'yeni_aciklama', description: 'Yeni kanal açıklaması', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `KANALLARI YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const kanal = interaction.options.getChannel('kanal');
        const aciklama = interaction.options.getString('yeni_aciklama');
        if (kanal.type !== "GUILD_TEXT") {
          return interaction.reply({ content: "Sadece metin kanallarının konusu değiştirilebilir.", ephemeral: true });
        }
        await kanal.setTopic(aciklama);
        return interaction.reply({ content: `✅ <#${kanal.id}> kanalının açıklaması başarıyla güncellendi!` });
      }
    },
    {
      name: 'bilgi',
      description: 'Belirtilen kanal hakkında detaylı bilgi verir.',
      options: [
        { name: 'kanal', description: 'Bilgisi görüntülenecek kanal', type: 'channel', require: true }
      ],
      async execute(client, interaction) {
        const kanal = interaction.options.getChannel('kanal');
        const typeMap = {
          GUILD_TEXT: "Metin Kanalı",
          GUILD_VOICE: "Ses Kanalı",
          GUILD_CATEGORY: "Kategori",
          GUILD_NEWS: "Duyuru Kanalı",
          GUILD_STAGE_VOICE: "Sahne Kanalı"
        };

        const embed = new MessageEmbed()
          .setTitle(`📌 Kanal Bilgisi: #${kanal.name}`)
          .setColor("#3498db")
          .addField("Kanal ID", `\`${kanal.id}\``, true)
          .addField("Kanal Türü", `\`${typeMap[kanal.type] || kanal.type}\``, true)
          .addField("Oluşturulma Tarihi", `<t:${Math.floor(kanal.createdTimestamp / 1000)}:R>`, true)
          .addField("Kategori", kanal.parent ? kanal.parent.name : "Kategori Yok", true)
          .addField("Kanal Konusu", kanal.topic || "Konu belirtilmemiş.", false)
          .setFooter({ text: "SwankyBot Kanal Sistemi" });

        return interaction.reply({ embeds: [embed] });
      }
    }
  ]
};
