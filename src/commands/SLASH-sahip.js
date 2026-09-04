const { MessageEmbed } = require("discord.js");

const OWNER_ID = "606572330457497641";

function isOwner(interaction) {
  return interaction.user.id === OWNER_ID;
}

module.exports = {
  slash: true,
  name: ['sahip'],
  description: 'Bot sahibine özel yönetim komutları.',
  subcommands: [
    {
      name: 'sunucular',
      description: 'Botun ekli olduğu sunucuları listeler.',
      async execute(client, interaction) {
        if (!isOwner(interaction)) return interaction.reply({ content: "Bu komut sadece bot sahibine özeldir.", ephemeral: true });

        const guilds = client.guilds.cache.map(g => `• **${g.name}** \`(${g.id})\` - ${g.memberCount} üye`).join('\n');
        const embed = new MessageEmbed()
          .setTitle(`👑 Bot Sunucuları [${client.guilds.cache.size}]`)
          .setColor("GOLD")
          .setDescription(guilds.length > 4000 ? guilds.slice(0, 3900) + "..." : guilds);

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
    },
    {
      name: 'dmyaz',
      description: 'Belirtilen kullanıcıya bot üzerinden DM gönderir.',
      options: [
        { name: 'kullanici', description: 'Mesaj atılacak kullanıcı', type: 'user', require: true },
        { name: 'mesaj', description: 'Gönderilecek mesaj', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!isOwner(interaction)) return interaction.reply({ content: "Bu komut sadece bot sahibine özeldir.", ephemeral: true });

        const target = interaction.options.getUser('kullanici');
        const mesaj = interaction.options.getString('mesaj');

        try {
          await target.send(mesaj);
          return interaction.reply({ content: `✅ **${target.tag}** kullanıcısına mesaj iletildi:\n\`${mesaj}\``, ephemeral: true });
        } catch (e) {
          return interaction.reply({ content: `❌ Mesaj iletilemedi, kullanıcının DM'leri kapalı olabilir.`, ephemeral: true });
        }
      }
    },
    {
      name: 'durum',
      description: 'Botun oynuyor/aktivite durumunu değiştirir.',
      options: [
        { name: 'yazi', description: 'Aktivitede yazacak metin', type: 'string', require: true },
        {
          name: 'tip',
          description: 'Aktivite türü',
          type: 'string',
          require: false,
          choices: [
            { name: 'Oynuyor (PLAYING)', value: 'PLAYING' },
            { name: 'Dinliyor (LISTENING)', value: 'LISTENING' },
            { name: 'İzliyor (WATCHING)', value: 'WATCHING' },
            { name: 'Yarışıyor (COMPETING)', value: 'COMPETING' }
          ]
        }
      ],
      async execute(client, interaction) {
        if (!isOwner(interaction)) return interaction.reply({ content: "Bu komut sadece bot sahibine özeldir.", ephemeral: true });

        const yazi = interaction.options.getString('yazi');
        const tip = interaction.options.getString('tip') || 'PLAYING';

        client.user.setActivity(yazi, { type: tip });
        return interaction.reply({ content: `✅ Botun aktivitesi başarıyla güncellendi:\n**${tip}**: \`${yazi}\``, ephemeral: true });
      }
    },
    {
      name: 'ayril',
      description: 'Botu belirtilen ID\'deki sunucudan çıkarır.',
      options: [
        { name: 'sunucu_id', description: 'Ayrılınacak sunucunun IDsi', type: 'string', require: true }
      ],
      async execute(client, interaction) {
        if (!isOwner(interaction)) return interaction.reply({ content: "Bu komut sadece bot sahibine özeldir.", ephemeral: true });

        const targetGid = interaction.options.getString('sunucu_id');
        const targetGuild = client.guilds.cache.get(targetGid);
        if (!targetGuild) return interaction.reply({ content: "Bot bu ID'ye sahip bir sunucuda bulunamadı.", ephemeral: true });

        const gName = targetGuild.name;
        await targetGuild.leave();
        return interaction.reply({ content: `✅ **${gName}** (${targetGid}) sunucusundan başarıyla ayrıldım.`, ephemeral: true });
      }
    }
  ]
};
