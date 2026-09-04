const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("nrc.db");
const moment = require("moment");
moment.locale("tr");

const ALINABILIR_FIYATLAR = {
  kazma: { name: 'Kazma (5 kullanım)', fiyat: 150, dbKey: 'kazma' },
  balta: { name: 'Balta (5 kullanım)', fiyat: 110, dbKey: 'balta' },
  elmas: { name: 'Elmas', fiyat: 70, dbKey: 'elmas' },
  altin: { name: 'Altın', fiyat: 60, dbKey: 'altın' },
  demir: { name: 'Demir', fiyat: 45, dbKey: 'demir' },
  gumus: { name: 'Gümüş', fiyat: 40, dbKey: 'gümüş' },
  bor: { name: 'Bor', fiyat: 35, dbKey: 'bor' },
  bronz: { name: 'Bronz', fiyat: 30, dbKey: 'bronz' },
  komur: { name: 'Kömür', fiyat: 25, dbKey: 'kömür' },
  odun: { name: 'Odun', fiyat: 20, dbKey: 'odun' }
};

const SATILABILIR_FIYATLAR = {
  elmas: { name: 'Elmas', fiyat: 55, dbKey: 'elmas' },
  altin: { name: 'Altın', fiyat: 50, dbKey: 'altın' },
  demir: { name: 'Demir', fiyat: 35, dbKey: 'demir' },
  gumus: { name: 'Gümüş', fiyat: 30, dbKey: 'gümüş' },
  bor: { name: 'Bor', fiyat: 25, dbKey: 'bor' },
  bronz: { name: 'Bronz', fiyat: 20, dbKey: 'bronz' },
  komur: { name: 'Kömür', fiyat: 20, dbKey: 'kömür' },
  odun: { name: 'Odun', fiyat: 10, dbKey: 'odun' }
};

module.exports = {
  slash: true,
  name: ['ekonomi'],
  description: 'Ekonomi, banka, çalışma ve market sistemi.',
  subcommands: [
    {
      name: 'gunluk',
      description: 'Günlük SSCoin hediyenizi alırsınız.',
      async execute(client, interaction) {
        const userId = interaction.user.id;
        const kontrol = Number(db.fetch(`günlük_${userId}`));
        if (kontrol > moment.utc().format("X")) {
          return interaction.reply({ content: `Bir sonraki günlük ödülünü <t:${kontrol}:R> sonra alabilirsin.`, ephemeral: true });
        }

        const gunlukListe = ["55","75","105","125","145","165","185","200","225","245","265","285","300","325","345"];
        const odul = gunlukListe[Math.floor(Math.random() * gunlukListe.length)];

        db.add(`coin_${userId}`, Number(odul));
        db.set(`günlük_${userId}`, moment.utc().add(1, 'day').format("X"));
        return interaction.reply({ content: `🎉 Başarılı bir şekilde günlük hediyeni (**${odul} SSCoin**) aldın!` });
      }
    },
    {
      name: 'bakiye',
      description: 'Cüzdan ve banka bakiyesini görüntülersiniz.',
      options: [
        {
          name: 'kullanici',
          description: 'Bakiyesine bakılacak kullanıcı (opsiyonel)',
          type: 'user',
          require: false
        }
      ],
      async execute(client, interaction) {
        const user = interaction.options.getUser('kullanici') || interaction.user;
        const coin = db.fetch(`coin_${user.id}`) || 0;
        const bankaCoin = db.fetch(`banka_coin_${user.id}`) || 0;
        const vadeliCoin = db.fetch(`banka_coin_vadeli_${user.id}`) || 0;
        const hesap = db.fetch(`hesap_${user.id}`);

        const embed = new MessageEmbed()
          .setTitle(`${user.username} - Bakiye Durumu`)
          .setThumbnail(user.displayAvatarURL())
          .setColor("#ffd700")
          .addField("Hesap Durumu", hesap ? `Açık (${hesap.name})` : "Hesap Yok", true)
          .addField("Cüzdan", `**${coin}** SSCoin`, true)
          .addField("Banka", `**${bankaCoin}** SSCoin`, true)
          .addField("Vadeli Hesap", `**${vadeliCoin}** SSCoin`, true)
          .setFooter({ text: `SwankyBot Ekonomi`, iconURL: client.user.avatarURL() })
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'hesap',
      description: 'Banka/Ekonomi hesabı açar veya kapatırsınız.',
      options: [
        {
          name: 'islem',
          description: 'Yapmak istediğiniz işlem',
          type: 'string',
          require: true,
          choices: [
            { name: 'Hesap Aç', value: 'ac' },
            { name: 'Hesap Kapat', value: 'kapat' }
          ]
        },
        {
          name: 'isim',
          description: 'Açılacak hesabın adı (Sadece açarken)',
          type: 'string',
          require: false
        }
      ],
      async execute(client, interaction) {
        const islem = interaction.options.getString('islem');
        const isim = interaction.options.getString('isim');
        const userId = interaction.user.id;

        if (islem === 'ac') {
          if (!isim) return interaction.reply({ content: "Lütfen açmak istediğiniz hesabın adını belirtin.", ephemeral: true });
          const mevcut = db.fetch(`hesap_${userId}`);
          if (mevcut) return interaction.reply({ content: `Zaten **${mevcut.name}** adında bir hesabınız var.`, ephemeral: true });

          db.set(`hesap_${userId}`, { name: isim });
          if (!db.fetch(`coin_${userId}`)) db.set(`coin_${userId}`, 0);
          return interaction.reply({ content: `✅ Hesabınız başarıyla **${isim}** ismiyle açılmıştır.` });
        } else if (islem === 'kapat') {
          const kontrol = db.fetch(`hesap_${userId}`);
          if (!kontrol) return interaction.reply({ content: "Zaten açık bir hesabınız bulunmuyor.", ephemeral: true });
          db.delete(`hesap_${userId}`);
          db.delete(`coin_${userId}`);
          return interaction.reply({ content: "Hesabınız başarıyla kapatıldı ve bakiyeniz sıfırlandı." });
        }
      }
    },
    {
      name: 'gonder',
      description: 'Bir kullanıcıya SSCoin transfer edersiniz.',
      options: [
        {
          name: 'kullanici',
          description: 'SSCoin göndereceğiniz kişi',
          type: 'user',
          require: true
        },
        {
          name: 'miktar',
          description: 'Gönderilecek miktar',
          type: 'integer',
          require: true
        }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('kullanici');
        const miktar = interaction.options.getInteger('miktar');
        const senderId = interaction.user.id;

        if (target.id === senderId) return interaction.reply({ content: "Kendinize SSCoin gönderemezsiniz.", ephemeral: true });
        if (target.bot) return interaction.reply({ content: "Botlara SSCoin gönderemezsiniz.", ephemeral: true });
        if (miktar <= 0) return interaction.reply({ content: "Geçerli pozitif bir miktar giriniz.", ephemeral: true });

        const senderCoin = db.fetch(`coin_${senderId}`) || 0;
        if (senderCoin < miktar) return interaction.reply({ content: `Yetersiz bakiye! Cüzdanınızda **${senderCoin}** SSCoin var.`, ephemeral: true });

        db.add(`coin_${senderId}`, -miktar);
        db.add(`coin_${target.id}`, miktar);

        return interaction.reply({ content: `💸 \`${target.tag}\` kullanıcısına başarıyla **${miktar} SSCoin** gönderdiniz.` });
      }
    },
    {
      name: 'calis',
      description: 'Orman veya madende çalışarak kaynak toplarsınız.',
      options: [
        {
          name: 'alan',
          description: 'Çalışmak istediğiniz bölge',
          type: 'string',
          require: true,
          choices: [
            { name: 'Orman (Balta gerektirir)', value: 'orman' },
            { name: 'Maden (Kazma gerektirir)', value: 'maden' }
          ]
        }
      ],
      async execute(client, interaction) {
        const alan = interaction.options.getString('alan');
        const userId = interaction.user.id;

        if (alan === 'orman') {
          const balta = db.fetch(`balta_${userId}`);
          if (!balta || balta <= 0) return interaction.reply({ content: "Çantanızda **balta** bulunmuyor! Marketten balta alabilirsiniz.", ephemeral: true });

          const miktarlar = ["2","3","4","5","6","7","8","9","10"];
          const adet = Number(miktarlar[Math.floor(Math.random() * miktarlar.length)]);

          db.add(`odun_${userId}`, adet);
          db.add(`balta_hak_${userId}`, 1);

          let msg = `🪓 Ormanda çalıştınız ve **${adet} adet Odun** topladınız!`;
          if ((db.fetch(`balta_hak_${userId}`) || 0) >= 5) {
            db.set(`balta_hak_${userId}`, 0);
            db.add(`balta_${userId}`, -1);
            msg += "\n⚠️ Bir adet baltanız kırıldı!";
          }
          return interaction.reply({ content: msg });
        } else if (alan === 'maden') {
          const kazma = db.fetch(`kazma_${userId}`);
          if (!kazma || kazma <= 0) return interaction.reply({ content: "Çantanızda **kazma** bulunmuyor! Marketten kazma alabilirsiniz.", ephemeral: true });

          const madenler = [
            { key: 'elmas', name: 'Elmas', min: 1, max: 2, sans: 5 },
            { key: 'altın', name: 'Altın', min: 1, max: 3, sans: 10 },
            { key: 'gümüş', name: 'Gümüş', min: 2, max: 4, sans: 15 },
            { key: 'demir', name: 'Demir', min: 2, max: 5, sans: 25 },
            { key: 'kömür', name: 'Kömür', min: 3, max: 7, sans: 45 }
          ];

          const secilen = madenler[Math.floor(Math.random() * madenler.length)];
          const adet = Math.floor(Math.random() * (secilen.max - secilen.min + 1)) + secilen.min;

          db.add(`${secilen.key}_${userId}`, adet);
          db.add(`kazma_hak_${userId}`, 1);

          let msg = `⛏️ Madende kazı yaptınız ve **${adet} adet ${secilen.name}** çıkardınız!`;
          if ((db.fetch(`kazma_hak_${userId}`) || 0) >= 5) {
            db.set(`kazma_hak_${userId}`, 0);
            db.add(`kazma_${userId}`, -1);
            msg += "\n⚠️ Bir adet kazmanız kırıldı!";
          }
          return interaction.reply({ content: msg });
        }
      }
    },
    {
      name: 'canta',
      description: 'Çantanızdaki maden ve orman ürünlerini görüntülersiniz.',
      options: [
        {
          name: 'kullanici',
          description: 'Çantasına bakılacak kullanıcı (opsiyonel)',
          type: 'user',
          require: false
        }
      ],
      async execute(client, interaction) {
        const user = interaction.options.getUser('kullanici') || interaction.user;
        const uid = user.id;

        const kazma = db.fetch(`kazma_${uid}`) || 0;
        const balta = db.fetch(`balta_${uid}`) || 0;
        const elmas = db.fetch(`elmas_${uid}`) || 0;
        const altin = db.fetch(`altın_${uid}`) || 0;
        const demir = db.fetch(`demir_${uid}`) || 0;
        const gumus = db.fetch(`gümüş_${uid}`) || 0;
        const komur = db.fetch(`kömür_${uid}`) || 0;
        const odun = db.fetch(`odun_${uid}`) || 0;
        const coin = db.fetch(`coin_${uid}`) || 0;

        const embed = new MessageEmbed()
          .setTitle(`🎒 ${user.username} adlı kullanıcının Çantası`)
          .setThumbnail(user.displayAvatarURL())
          .setColor("#3498db")
          .setDescription(`Cüzdandaki SSCoin: **${coin}**`)
          .addField("Aletler", `⛏️ Kazma: **${kazma}**\n🪓 Balta: **${balta}**`, true)
          .addField("Madenler", `💎 Elmas: **${elmas}**\n🪙 Altın: **${altin}**\n🥈 Gümüş: **${gumus}**\n🔩 Demir: **${demir}**\n🪨 Kömür: **${komur}**`, true)
          .addField("Orman", `🪵 Odun: **${odun}**`, true)
          .setFooter({ text: "SwankyBot Ekonomi", iconURL: client.user.avatarURL() });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'market',
      description: 'Marketi görüntüler, ürün satın alır veya satarsınız.',
      options: [
        {
          name: 'islem',
          description: 'Yapmak istediğiniz market işlemi',
          type: 'string',
          require: true,
          choices: [
            { name: 'Market Listesi', value: 'liste' },
            { name: 'Satın Al', value: 'al' },
            { name: 'Sat', value: 'sat' }
          ]
        },
        {
          name: 'urun',
          description: 'Satın alınacak veya satılacak ürün',
          type: 'string',
          require: false,
          choices: [
            { name: 'Kazma (Al: 150)', value: 'kazma' },
            { name: 'Balta (Al: 110)', value: 'balta' },
            { name: 'Elmas (Al: 70 | Sat: 55)', value: 'elmas' },
            { name: 'Altın (Al: 60 | Sat: 50)', value: 'altin' },
            { name: 'Demir (Al: 45 | Sat: 35)', value: 'demir' },
            { name: 'Gümüş (Al: 40 | Sat: 30)', value: 'gumus' },
            { name: 'Kömür (Al: 25 | Sat: 20)', value: 'komur' },
            { name: 'Odun (Al: 20 | Sat: 10)', value: 'odun' }
          ]
        },
        {
          name: 'adet',
          description: 'Alınacak veya satılacak adet (Varsayılan 1)',
          type: 'integer',
          require: false
        }
      ],
      async execute(client, interaction) {
        const islem = interaction.options.getString('islem');
        const urun = interaction.options.getString('urun');
        const adet = interaction.options.getInteger('adet') || 1;
        const uid = interaction.user.id;

        if (islem === 'liste') {
          const embed = new MessageEmbed()
            .setTitle("🛒 SwankyBot - Ekonomi Marketi")
            .setColor("#2ecc71")
            .addField("Alınabilir Ürünler", 
              "⛏️ Kazma (5 hak): **150** SSCoin\n" +
              "🪓 Balta (5 hak): **110** SSCoin\n" +
              "💎 Elmas: **70** SSCoin\n" +
              "🪙 Altın: **60** SSCoin\n" +
              "🔩 Demir: **45** SSCoin\n" +
              "🥈 Gümüş: **40** SSCoin\n" +
              "🪨 Kömür: **25** SSCoin\n" +
              "🪵 Odun: **20** SSCoin", true)
            .addField("Satılabilir Ürünler",
              "💎 Elmas: **55** SSCoin\n" +
              "🪙 Altın: **50** SSCoin\n" +
              "🔩 Demir: **35** SSCoin\n" +
              "🥈 Gümüş: **30** SSCoin\n" +
              "🪨 Kömür: **20** SSCoin\n" +
              "🪵 Odun: **10** SSCoin", true)
            .setFooter({ text: "Ürün almak için /ekonomi market islem:Satın Al seçiniz." });
          return interaction.reply({ embeds: [embed] });
        }

        if (islem === 'al') {
          if (!urun) return interaction.reply({ content: "Lütfen satın almak istediğiniz ürünü seçin.", ephemeral: true });
          const item = ALINABILIR_FIYATLAR[urun];
          if (!item) return interaction.reply({ content: "Bu ürün satın alınamaz.", ephemeral: true });

          const toplamFiyat = item.fiyat * adet;
          const bakiye = db.fetch(`coin_${uid}`) || 0;
          if (bakiye < toplamFiyat) {
            return interaction.reply({ content: `Yetersiz bakiye! **${adet}x ${item.name}** için **${toplamFiyat} SSCoin** gerekiyor. Sizin bakiyeniz: **${bakiye}**`, ephemeral: true });
          }

          db.add(`coin_${uid}`, -toplamFiyat);
          db.add(`${item.dbKey}_${uid}`, adet);
          return interaction.reply({ content: `✅ Başarıyla **${adet} adet ${item.name}** satın aldınız. Ödenen: **${toplamFiyat} SSCoin**.` });
        }

        if (islem === 'sat') {
          if (!urun) return interaction.reply({ content: "Lütfen satmak istediğiniz ürünü seçin.", ephemeral: true });
          const item = SATILABILIR_FIYATLAR[urun];
          if (!item) return interaction.reply({ content: "Bu ürün satılamaz.", ephemeral: true });

          const mevcut = db.fetch(`${item.dbKey}_${uid}`) || 0;
          if (mevcut < adet) {
            return interaction.reply({ content: `Çantanızda yeterli **${item.name}** yok! Mevcut: **${mevcut}**, Satılmak istenen: **${adet}**`, ephemeral: true });
          }

          const gelir = item.fiyat * adet;
          db.add(`${item.dbKey}_${uid}`, -adet);
          db.add(`coin_${uid}`, gelir);
          return interaction.reply({ content: `💰 Başarıyla **${adet} adet ${item.name}** sattınız ve **${gelir} SSCoin** kazandınız.` });
        }
      }
    },
    {
      name: 'banka',
      description: 'Banka hesabı kurma, para yatırma ve çekme işlemleri.',
      options: [
        {
          name: 'islem',
          description: 'Yapmak istediğiniz banka işlemi',
          type: 'string',
          require: true,
          choices: [
            { name: 'Banka Durumu', value: 'durum' },
            { name: 'Banka Hesabı Aç (120 Coin)', value: 'kur' },
            { name: 'Banka Hesabı Kapat', value: 'kapat' },
            { name: 'Para Yatır', value: 'yatir' },
            { name: 'Para Çek', value: 'cek' }
          ]
        },
        {
          name: 'miktar',
          description: 'Yatırılacak veya çekilecek miktar',
          type: 'integer',
          require: false
        }
      ],
      async execute(client, interaction) {
        const islem = interaction.options.getString('islem');
        const miktar = interaction.options.getInteger('miktar');
        const uid = interaction.user.id;

        const bankaVar = db.fetch(`banka_${uid}`);
        const bankaCoin = db.fetch(`banka_coin_${uid}`) || 0;
        const cuzdanCoin = db.fetch(`coin_${uid}`) || 0;
        const hesap = db.fetch(`hesap_${uid}`);

        if (islem === 'durum') {
          const embed = new MessageEmbed()
            .setTitle(`🏦 ${interaction.user.username} - Banka Hesabı`)
            .setColor("#9b59b6")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addField("Banka Durumu", bankaVar ? `Aktif (Hesap: ${hesap ? hesap.name : 'Bilinmiyor'})` : "Banka Hesabı Yok")
            .addField("Bankadaki Para", `**${bankaCoin}** SSCoin`, true)
            .addField("Cüzdandaki Para", `**${cuzdanCoin}** SSCoin`, true);
          return interaction.reply({ embeds: [embed] });
        }

        if (islem === 'kur') {
          if (!hesap) return interaction.reply({ content: "Önce `/ekonomi hesap islem:Hesap Aç` ile temel hesabınızı açmalısınız.", ephemeral: true });
          if (bankaVar) return interaction.reply({ content: "Zaten açık bir banka hesabınız bulunuyor.", ephemeral: true });
          if (cuzdanCoin < 120) return interaction.reply({ content: "Banka hesabı kurmak için cüzdanınızda en az **120 SSCoin** olmalıdır.", ephemeral: true });

          db.add(`coin_${uid}`, -120);
          db.set(`banka_${uid}`, true);
          db.set(`banka_coin_${uid}`, 0);
          return interaction.reply({ content: "🏦 Banka hesabınız başarıyla açılmıştır (120 SSCoin kesildi)." });
        }

        if (islem === 'kapat') {
          if (!bankaVar) return interaction.reply({ content: "Açık bir banka hesabınız bulunmuyor.", ephemeral: true });
          db.delete(`banka_${uid}`);
          db.delete(`banka_coin_${uid}`);
          return interaction.reply({ content: "Banka hesabınız kapatılmıştır." });
        }

        if (islem === 'yatir') {
          if (!bankaVar) return interaction.reply({ content: "Önce bir banka hesabı kurmalısınız.", ephemeral: true });
          if (!miktar || miktar <= 0) return interaction.reply({ content: "Geçerli bir miktar giriniz.", ephemeral: true });
          if (cuzdanCoin < miktar) return interaction.reply({ content: `Cüzdanınızda yeterli para yok. Mevcut: **${cuzdanCoin}** SSCoin`, ephemeral: true });

          db.add(`coin_${uid}`, -miktar);
          db.add(`banka_coin_${uid}`, miktar);
          return interaction.reply({ content: `📥 Banka hesabınıza **${miktar} SSCoin** başarıyla yatırıldı.` });
        }

        if (islem === 'cek') {
          if (!bankaVar) return interaction.reply({ content: "Önce bir banka hesabı kurmalısınız.", ephemeral: true });
          if (!miktar || miktar <= 0) return interaction.reply({ content: "Geçerli bir miktar giriniz.", ephemeral: true });
          if (bankaCoin < miktar) return interaction.reply({ content: `Bankanızda bu kadar para yok. Mevcut: **${bankaCoin}** SSCoin`, ephemeral: true });

          db.add(`banka_coin_${uid}`, -miktar);
          db.add(`coin_${uid}`, miktar);
          return interaction.reply({ content: `📤 Banka hesabınızdan **${miktar} SSCoin** çektiniz.` });
        }
      }
    }
  ]
};
