const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  slash: true,
  name: ['abone'],
  description: 'Abone rolü verme ve yetkili sistemi.',
  subcommands: [
    {
      name: 'ver',
      description: 'Belirttiğiniz kullanıcıya abone rolü verirsiniz.',
      options: [
        { name: 'kullanici', description: 'Abone rolü verilecek kullanıcı', type: 'user', require: true }
      ],
      async execute(client, interaction) {
        const gid = interaction.guild.id;
        const yetkiliRol = db.fetch(`aboneyetkili_${gid}`);
        if (yetkiliRol && !interaction.member.roles.cache.has(yetkiliRol) && !interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: `Bu komutu kullanabilmek için <@&${yetkiliRol}> rolüne veya Yönetici yetkisine sahip olmalısınız.`, ephemeral: true });
        }

        const aboneRol = db.fetch(`abonerol_${gid}`);
        if (!aboneRol) {
          return interaction.reply({ content: "Sunucuda henüz bir abone rolü ayarlanmamış! `/abone rol-ayarla` ile ayarlayabilirsiniz.", ephemeral: true });
        }

        const targetUser = interaction.options.getUser('kullanici');
        const member = interaction.guild.members.cache.get(targetUser.id);
        if (!member) return interaction.reply({ content: "Kullanıcı sunucuda bulunamadı.", ephemeral: true });

        await member.roles.add(aboneRol).catch(() => {});
        db.add(`abonesayı_${interaction.user.id}_${gid}`, 1);
        const kayitsayi = db.fetch(`abonesayı_${interaction.user.id}_${gid}`) || 1;

        const embed = new MessageEmbed()
          .setTitle("🎉 Abone Rolü Verildi!")
          .setThumbnail(targetUser.displayAvatarURL())
          .setDescription(`${interaction.user} adlı yetkilinin abone rolü verdiği toplam üye: **${kayitsayi}**`)
          .addField("Rol Veren Yetkili", `${interaction.user}`, true)
          .addField("Rol Verilen Üye", `${member}`, true)
          .setColor("#e74c3c")
          .setFooter({ text: "SwankyBot Abone Sistemi", iconURL: client.user.avatarURL() })
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'rol-ayarla',
      description: 'Abone rolünü ayarlarsınız.',
      options: [
        { name: 'rol', description: 'Abonelere verilecek rol', type: 'role', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const rol = interaction.options.getRole('rol');
        db.set(`abonerol_${interaction.guild.id}`, rol.id);
        return interaction.reply({ content: `✅ Abone rolü başarıyla <@&${rol.id}> olarak ayarlandı.` });
      }
    },
    {
      name: 'rol-sifirla',
      description: 'Abone rolünü sıfırlarsınız.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        db.delete(`abonerol_${interaction.guild.id}`);
        return interaction.reply({ content: "🗑️ Abone rolü başarıyla sıfırlandı." });
      }
    },
    {
      name: 'yetkili-ayarla',
      description: 'Abone rolü verebilecek yetkili rolünü ayarlarsınız.',
      options: [
        { name: 'rol', description: 'Yetkili rolü', type: 'role', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const rol = interaction.options.getRole('rol');
        db.set(`aboneyetkili_${interaction.guild.id}`, rol.id);
        return interaction.reply({ content: `✅ Abone yetkilisi rolü başarıyla <@&${rol.id}> olarak ayarlandı.` });
      }
    },
    {
      name: 'yetkili-sifirla',
      description: 'Abone yetkilisi rolünü sıfırlarsınız.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        db.delete(`aboneyetkili_${interaction.guild.id}`);
        return interaction.reply({ content: "🗑️ Abone yetkilisi rolü başarıyla sıfırlandı." });
      }
    },
    {
      name: 'sayi',
      description: 'Yetkilinin abone verme sayısını görüntüler.',
      options: [
        { name: 'yetkili', description: 'Sayılarına bakılacak yetkili (opsiyonel)', type: 'user', require: false }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('yetkili') || interaction.user;
        const sayi = db.fetch(`abonesayı_${target.id}_${interaction.guild.id}`) || 0;
        return interaction.reply({ content: `📊 ${target} adlı yetkilinin verdiği abone rolü sayısı: **${sayi}**` });
      }
    }
  ]
};
