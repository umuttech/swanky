const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  slash: true,
  name: ['rol'],
  description: 'Sunucu rol yönetimi ve rol işlemleri.',
  subcommands: [
    {
      name: 'ver',
      description: 'Belirttiğiniz kullanıcıya belirtilen rolü verir.',
      options: [
        { name: 'kullanici', description: 'Rol verilecek üye', type: 'user', require: true },
        { name: 'rol', description: 'Verilecek rol', type: 'role', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_ROLES") && !interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ROLLLERİ YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanici');
        const role = interaction.options.getRole('rol');
        const member = interaction.guild.members.cache.get(targetUser.id);
        if (!member) return interaction.reply({ content: "Belirtilen kullanıcı sunucuda bulunamadı.", ephemeral: true });

        if (member.roles.cache.has(role.id)) {
          return interaction.reply({ content: "Kullanıcıda zaten bu rol bulunuyor.", ephemeral: true });
        }

        try {
          await member.roles.add(role);
          const embed = new MessageEmbed()
            .setTitle("✅ Rol Verildi")
            .setColor("GREEN")
            .setDescription(`${member} adlı kullanıcıya başarıyla <@&${role.id}> rolü verildi.`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `İşlemi Yapan: ${interaction.user.tag}` })
            .setTimestamp();

          return interaction.reply({ embeds: [embed] });
        } catch (e) {
          return interaction.reply({ content: `Rol verilemedi: Botun rolü, verilmek istenen rolden daha aşağıda olabilir.`, ephemeral: true });
        }
      }
    },
    {
      name: 'al',
      description: 'Belirttiğiniz kullanıcıdan belirtilen rolü alır.',
      options: [
        { name: 'kullanici', description: 'Rolü alınacak üye', type: 'user', require: true },
        { name: 'rol', description: 'Alınacak rol', type: 'role', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_ROLES") && !interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ROLLLERİ YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanici');
        const role = interaction.options.getRole('rol');
        const member = interaction.guild.members.cache.get(targetUser.id);
        if (!member) return interaction.reply({ content: "Belirtilen kullanıcı sunucuda bulunamadı.", ephemeral: true });

        if (!member.roles.cache.has(role.id)) {
          return interaction.reply({ content: "Kullanıcıda zaten bu rol bulunmuyor.", ephemeral: true });
        }

        try {
          await member.roles.remove(role);
          const embed = new MessageEmbed()
            .setTitle("🗑️ Rol Alındı")
            .setColor("ORANGE")
            .setDescription(`${member} adlı kullanıcıdan <@&${role.id}> rolü başarıyla alındı.`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `İşlemi Yapan: ${interaction.user.tag}` })
            .setTimestamp();

          return interaction.reply({ embeds: [embed] });
        } catch (e) {
          return interaction.reply({ content: `Rol alınamadı: Botun rolü, alınmak istenen rolden daha aşağıda olabilir.`, ephemeral: true });
        }
      }
    },
    {
      name: 'olustur',
      description: 'Sunucuda yeni bir rol oluşturur.',
      options: [
        { name: 'isim', description: 'Oluşturulacak rolün adı', type: 'string', require: true },
        { name: 'renk', description: 'Rol rengi (Örn: #ff0000 veya BLUE)', type: 'string', require: false }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("MANAGE_ROLES")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `ROLLLERİ YÖNET` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const isim = interaction.options.getString('isim');
        const renk = interaction.options.getString('renk') || '#99aab5';

        try {
          const newRole = await interaction.guild.roles.create({
            name: isim,
            color: renk
          });
          return interaction.reply({ content: `✅ <@&${newRole.id}> (\`${newRole.name}\`) adında yeni bir rol oluşturuldu!` });
        } catch (e) {
          return interaction.reply({ content: `Rol oluşturulamadı: ${e.message}`, ephemeral: true });
        }
      }
    },
    {
      name: 'toplu-ver',
      description: 'Sunucudaki tüm üyelere belirtilen rolü verir.',
      options: [
        { name: 'rol', description: 'Herkese verilecek rol', type: 'role', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        await interaction.deferReply();
        const role = interaction.options.getRole('rol');

        let eklenen = 0;
        const members = await interaction.guild.members.fetch();
        for (const [id, member] of members) {
          if (!member.user.bot && !member.roles.cache.has(role.id) && member.manageable) {
            await member.roles.add(role).catch(() => {});
            eklenen++;
          }
        }

        return interaction.editReply({ content: `✅ Toplu rol verme tamamlandı! Toplam **${eklenen}** üyeye <@&${role.id}> rolü verildi.` });
      }
    }
  ]
};
