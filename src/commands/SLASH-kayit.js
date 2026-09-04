const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("quick.db");

module.exports = {
  slash: true,
  name: ['kayit'],
  description: 'Gelişmiş sunucu kayıt sistemi.',
  subcommands: [
    {
      name: 'kur',
      description: 'Kayıt sistemini ve rollerini ayarlarsınız.',
      options: [
        { name: 'erkek', description: 'Erkek üyelere verilecek rol', type: 'role', require: true },
        { name: 'kiz', description: 'Kız üyelere verilecek rol', type: 'role', require: true },
        { name: 'kayitsiz', description: 'Kayıtsız üyelere verilecek rol', type: 'role', require: true },
        { name: 'yetkili', description: 'Kayıt yetkilisi rolü', type: 'role', require: true },
        { name: 'giris', description: 'Hoş geldin mesajının gideceği kayıt kanalı', type: 'channel', require: true },
        { name: 'sohbet', description: 'Kayıt tamamlandığında mesaj atılacak genel sohbet kanalı', type: 'channel', require: true },
        { name: 'sembol', description: 'İsim ve yaş arasındaki sembol (Örn: | veya •)', type: 'string', require: false },
        { name: 'tag', description: 'İsim başına eklenecek tag', type: 'string', require: false }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const gid = interaction.guild.id;
        const erkek = interaction.options.getRole('erkek');
        const kiz = interaction.options.getRole('kiz');
        const kayitsiz = interaction.options.getRole('kayitsiz');
        const yetkili = interaction.options.getRole('yetkili');
        const giris = interaction.options.getChannel('giris');
        const sohbet = interaction.options.getChannel('sohbet');
        const sembol = interaction.options.getString('sembol') || '|';
        const tag = interaction.options.getString('tag') || '';

        db.set(`erkekroll_${gid}`, erkek.id);
        db.set(`kızroll_${gid}`, kiz.id);
        db.set(`kayıtsızroll_${gid}`, kayitsiz.id);
        db.set(`yetkiliroll_${gid}`, yetkili.id);
        db.set(`giriskanall_${gid}`, giris.id);
        db.set(`hgkanall_${gid}`, sohbet.id);
        db.set(`semboll_${gid}`, sembol);
        db.set(`tagg_${gid}`, tag);

        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("✅ Kayıt Sistemi Kuruldu!")
          .setDescription("Kayıt sistemi ve kanalları başarıyla kaydedildi.")
          .addField("Erkek Rolü", `<@&${erkek.id}>`, true)
          .addField("Kız Rolü", `<@&${kiz.id}>`, true)
          .addField("Kayıtsız Rolü", `<@&${kayitsiz.id}>`, true)
          .addField("Yetkili Rolü", `<@&${yetkili.id}>`, true)
          .addField("Giriş Kanalı", `<#${giris.id}>`, true)
          .addField("Sohbet Kanalı", `<#${sohbet.id}>`, true)
          .setFooter({ text: "SwankyBot Kayıt Sistemi" });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'sifirla',
      description: 'Kayıt sistemi ayarlarını tamamen sıfırlar.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }
        const gid = interaction.guild.id;
        db.delete(`erkekroll_${gid}`);
        db.delete(`kızroll_${gid}`);
        db.delete(`kayıtsızroll_${gid}`);
        db.delete(`yetkiliroll_${gid}`);
        db.delete(`giriskanall_${gid}`);
        db.delete(`hgkanall_${gid}`);
        db.delete(`semboll_${gid}`);
        db.delete(`tagg_${gid}`);
        return interaction.reply({ content: "🗑️ Kayıt sistemi ayarları başarıyla sıfırlandı." });
      }
    },
    {
      name: 'erkek',
      description: 'Bir üyeyi erkek olarak kaydeder.',
      options: [
        { name: 'uye', description: 'Kayıt edilecek üye', type: 'user', require: true },
        { name: 'isim', description: 'Üyenin ismi', type: 'string', require: true },
        { name: 'yas', description: 'Üyenin yaşı', type: 'integer', require: true }
      ],
      async execute(client, interaction) {
        const gid = interaction.guild.id;
        const yetkiliRolId = db.get(`yetkiliroll_${gid}`);
        if (yetkiliRolId && !interaction.member.roles.cache.has(yetkiliRolId) && !interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: `Bu komutu kullanabilmek için <@&${yetkiliRolId}> rolüne veya Yönetici yetkisine sahip olmalısınız.`, ephemeral: true });
        }

        const user = interaction.options.getUser('uye');
        const isim = interaction.options.getString('isim');
        const yas = interaction.options.getInteger('yas');
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: "Belirtilen üye sunucuda bulunamadı.", ephemeral: true });

        const erkekRol = db.get(`erkekroll_${gid}`);
        const kayitsizRol = db.get(`kayıtsızroll_${gid}`);
        const sembol = db.get(`semboll_${gid}`) || '|';
        const tag = db.get(`tagg_${gid}`) || '';

        const yeniIsim = `${tag ? tag + ' ' : ''}${isim} ${sembol} ${yas}`;
        await member.setNickname(yeniIsim).catch(() => {});
        if (erkekRol) await member.roles.add(erkekRol).catch(() => {});
        if (kayitsizRol) await member.roles.remove(kayitsizRol).catch(() => {});

        db.add(`erkekkayıtt_${gid}_${interaction.user.id}`, 1);
        db.add(`toplamkayıtt_${gid}_${interaction.user.id}`, 1);

        const embed = new MessageEmbed()
          .setTitle("Kayıt Başarılı!")
          .setColor("BLUE")
          .setDescription(`${member} adlı üye başarıyla **Erkek** olarak kaydedildi.`)
          .addField("Yeni İsim", `\`${yeniIsim}\``, true)
          .addField("Kayıt Eden", `${interaction.user}`, true)
          .setFooter({ text: "SwankyBot Kayıt Sistemi" });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'kiz',
      description: 'Bir üyeyi kız olarak kaydeder.',
      options: [
        { name: 'uye', description: 'Kayıt edilecek üye', type: 'user', require: true },
        { name: 'isim', description: 'Üyenin ismi', type: 'string', require: true },
        { name: 'yas', description: 'Üyenin yaşı', type: 'integer', require: true }
      ],
      async execute(client, interaction) {
        const gid = interaction.guild.id;
        const yetkiliRolId = db.get(`yetkiliroll_${gid}`);
        if (yetkiliRolId && !interaction.member.roles.cache.has(yetkiliRolId) && !interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: `Bu komutu kullanabilmek için <@&${yetkiliRolId}> rolüne veya Yönetici yetkisine sahip olmalısınız.`, ephemeral: true });
        }

        const user = interaction.options.getUser('uye');
        const isim = interaction.options.getString('isim');
        const yas = interaction.options.getInteger('yas');
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: "Belirtilen üye sunucuda bulunamadı.", ephemeral: true });

        const kizRol = db.get(`kızroll_${gid}`);
        const kayitsizRol = db.get(`kayıtsızroll_${gid}`);
        const sembol = db.get(`semboll_${gid}`) || '|';
        const tag = db.get(`tagg_${gid}`) || '';

        const yeniIsim = `${tag ? tag + ' ' : ''}${isim} ${sembol} ${yas}`;
        await member.setNickname(yeniIsim).catch(() => {});
        if (kizRol) await member.roles.add(kizRol).catch(() => {});
        if (kayitsizRol) await member.roles.remove(kayitsizRol).catch(() => {});

        db.add(`kızkayıtt_${gid}_${interaction.user.id}`, 1);
        db.add(`toplamkayıtt_${gid}_${interaction.user.id}`, 1);

        const embed = new MessageEmbed()
          .setTitle("Kayıt Başarılı!")
          .setColor("#e91e63")
          .setDescription(`${member} adlı üye başarıyla **Kız** olarak kaydedildi.`)
          .addField("Yeni İsim", `\`${yeniIsim}\``, true)
          .addField("Kayıt Eden", `${interaction.user}`, true)
          .setFooter({ text: "SwankyBot Kayıt Sistemi" });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'sayi',
      description: 'Yetkilinin kayıt istatistiklerini görüntüler.',
      options: [
        { name: 'yetkili', description: 'Kayıt sayısına bakılacak yetkili (opsiyonel)', type: 'user', require: false }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('yetkili') || interaction.user;
        const gid = interaction.guild.id;

        const erkekSayisi = db.get(`erkekkayıtt_${gid}_${target.id}`) || 0;
        const kizSayisi = db.get(`kızkayıtt_${gid}_${target.id}`) || 0;
        const toplam = db.get(`toplamkayıtt_${gid}_${target.id}`) || 0;

        const embed = new MessageEmbed()
          .setTitle(`📊 ${target.username} - Kayıt İstatistikleri`)
          .setColor("AQUA")
          .setThumbnail(target.displayAvatarURL())
          .addField("Erkek Kayıt", `**${erkekSayisi}**`, true)
          .addField("Kız Kayıt", `**${kizSayisi}**`, true)
          .addField("Toplam Kayıt", `**${toplam}**`, true)
          .setFooter({ text: "SwankyBot Kayıt Sistemi" });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'tag',
      description: 'Sunucu kayıt tagını görüntüler, ayarlar veya sıfırlar.',
      options: [
        {
          name: 'islem',
          description: 'Yapmak istediğiniz işlem',
          type: 'string',
          require: true,
          choices: [
            { name: 'Tagı Görüntüle', value: 'gor' },
            { name: 'Tag Ayarla', value: 'ayarla' },
            { name: 'Tag Sıfırla', value: 'sifirla' }
          ]
        },
        { name: 'tag', description: 'Ayarlanacak tag metni', type: 'string', require: false }
      ],
      async execute(client, interaction) {
        const islem = interaction.options.getString('islem');
        const tag = interaction.options.getString('tag');
        const gid = interaction.guild.id;

        if (islem === 'gor') {
          const mevcut = db.get(`tagg_${gid}`);
          return interaction.reply({ content: mevcut ? `Sunucuda ayarlı tag: **${mevcut}**` : "Sunucuda henüz bir tag ayarlanmamış." });
        }

        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu işlemi yapmak için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        if (islem === 'ayarla') {
          if (!tag) return interaction.reply({ content: "Lütfen ayarlamak istediğiniz tagı belirtin.", ephemeral: true });
          db.set(`tagg_${gid}`, tag);
          return interaction.reply({ content: `✅ Sunucu tagı başarıyla **${tag}** olarak ayarlandı.` });
        }

        if (islem === 'sifirla') {
          db.delete(`tagg_${gid}`);
          return interaction.reply({ content: "🗑️ Sunucu tagı başarıyla sıfırlandı." });
        }
      }
    }
  ]
};
