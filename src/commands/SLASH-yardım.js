const os = require("os");
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const moment = require("moment");
require('moment-duration-format');

module.exports = {
  slash: true,
  name: ['yardım'],
  description: 'SwankyBot tüm komutlar ve yardım menüsü.',
  option: [],
  
  async execute(client, interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("infoselectmenu")
        .setPlaceholder('Menüden Yardım Kategorisi Seç!')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          { label: "Genel", description: "Genel bot ve kullanıcı komutları", value: "genely", emoji: "🌐" },
          { label: "Eğlence", description: "Oyunlar, eğlenceli ve sosyal komutlar", value: "eglencey", emoji: "🎮" },
          { label: "Logo", description: "22 farklı stilde logo oluşturma", value: "logoy", emoji: "🎨" },
          { label: "Gif", description: "6 farklı kategoride GIF gönderme", value: "gıfy", emoji: "🎬" },
          { label: "Moderasyon", description: "Yetkili, ceza ve yönetim komutları", value: "mody", emoji: "🛡️" },
          { label: "Sunucu & Kanal", description: "Sunucu ve kanal yönetim komutları", value: "swy", emoji: "🏢" },
          { label: "Kayıt Sistemi", description: "Gelişmiş butonlu ve rollü kayıt sistemi", value: "kayıty", emoji: "📝" },
          { label: "Abone Sistemi", description: "Abone rolü verme ve yetkili sistemi", value: "aby", emoji: "🔔" },
          { label: "Ekonomi Sistemi", description: "SSCoin, bakiye, maden, market ve banka", value: "eksy", emoji: "💰" },
          { label: "Seviye Sistemi", description: "XP, seviye atlama ve rank kartı", value: "ssy", emoji: "📈" },
          { label: "Doğrulama Sistemi", description: "Resimli captcha ve güvenlik doğrulama", value: "dsy", emoji: "🔒" },
          { label: "Partnerlik Sistemi", description: "Sunucular arası otomatik partnerlik", value: "psy", emoji: "🤝" },
          { label: "Çekiliş Sistemi", description: "Hızlı ve butonlu çekiliş sistemi", value: "çsy", emoji: "🎉" },
          { label: "Bot List Sistemi", description: "Sunucular için bot onay ve listeleme", value: "bsy", emoji: "🤖" },
          { label: "Yetkili Alım Sistemi", description: "Başvuru ve yetkili alım sistemi", value: "ysy", emoji: "📋" },
          { label: "Sahip", description: "Bot sahibine özel komutlar", value: "owy", emoji: "👑" }
        ])
    );

    const mainEmbed = new MessageEmbed()
      .setTitle("📚 SwankyBot Yardım Menüsü")
      .setColor("#5865F2")
      .setDescription(
        "Aşağıdaki menüden dilediğiniz kategoriyi seçerek ilgili komutların listesini görüntüleyebilirsiniz.\n\n" +
        "> ✨ **Tüm komutlar %100 Slash Komut formatındadır.** Komutu kullanmak için başında `/` işareti kullanabilirsiniz."
      )
      .addField("📊 Bot Durumu",
        `**Gecikme (Ping):** \`${client.ws.ping}ms\`\n` +
        `**Sunucular:** \`${client.guilds.cache.size}\`\n` +
        `**Kullanıcılar:** \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\`\n` +
        `**Toplam Komut Sayısı:** \`${client.slashcommands.size}\``
      )
      .setFooter({ text: "Kategori seçmek için aşağıdaki menüyü kullanın.", iconURL: client.user.avatarURL() })
      .setTimestamp();

    const msg = await interaction.reply({ embeds: [mainEmbed], components: [row], fetchReply: true }).catch(console.error);
    if (!msg) return;

    const filter = i => i.customId === "infoselectmenu" && i.user.id === interaction.user.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 180000 });

    const HELP_DATA = {
      genely: {
        title: "🌐 Genel Komutlar",
        desc: 
          "`/bot davet` - Botun davet ve destek linklerini gönderir.\n" +
          "`/bot oyver` - Botun Top.gg oy sayfasını gönderir.\n" +
          "`/bot linkler` - Tüm resmi bağlantıları listeler.\n" +
          "`/bot yapimci` - Botun geliştiricisini gösterir.\n" +
          "`/kullanici bilgi` - Kullanıcı profil detaylarını gösterir.\n" +
          "`/kullanici banner` - Kullanıcının profil afişini görüntüler.\n" +
          "`/kullanici isim-degis` - Kullanıcının sunucudaki adını değiştirir.\n" +
          "`/not [al | gor | sifirla]` - Kişisel not defteriniz.\n" +
          "`/ses [cek | kes]` - Ses kanalına çekme veya ses bağlantısını kesme.\n" +
          "`/yaz` - Bota normal, embed veya spoilerli mesaj yazdırırsınız.\n" +
          "`/hesapla [islem]` - Matematiksel işlem hesaplar.\n" +
          "`/say` - Sunucudaki toplam üye ve ses istatistiklerini gösterir.\n" +
          "`/ceviri [metin] [dil]` - Google Çeviri ile metin çevirir.\n" +
          "`/sikayet [mesaj]` - Yapımcıya şikayet veya öneri iletir.\n" +
          "`/afk [sebep]` - AFK moduna geçersiniz.\n" +
          "`/avatar [kullanici]` - Profil resmini büyük boyutta gösterir.\n" +
          "`/hava-durumu [sehir]` - Şehrin hava durumu raporunu görüntüler.\n" +
          "`/istatistik` - Botun anlık RAM, CPU ve çalışma süresi istatistikleri.\n" +
          "`/ping` - Botun anlık gecikme süresini ölçer."
      },
      eglencey: {
        title: "🎮 Eğlence Komutları",
        desc:
          "`/soz [espri | iltifat | tekerleme]` - Eğlenceli metinler.\n" +
          "`/sans [zar | yazitura | slots | sayim | boyolcer]` - Şans oyunları.\n" +
          "`/etkilesim [op | oksa | tokatla | ship | teklif]` - Kullanıcı etkileşimleri.\n" +
          "`/akinatör` - Akinatör tahmin oyunu oynayın.\n" +
          "`/ascii [yazi] [stil]` - Metni ASCII sanatına dönüştürür.\n" +
          "`/tersyazi [metin]` - Metni tersten yazar.\n" +
          "`/fakemesaj [kullanici] [mesaj]` - Sahte webhook mesajı atar.\n" +
          "`/oylama [soru]` - Hızlı evet/hayır oylaması başlatır.\n" +
          "`/sor [soru]` - Sihirli 8-Ball soru sorma oyunu.\n" +
          "`/emoji-yazı [yazı]` - Mesajınızı harf emojilerine çevirir.\n" +
          "`/google [arama]` - Google arama bağlantısı oluşturur.\n" +
          "`/renk-ara [kod]` - Hex renk kodunu görselleştirir.\n" +
          "`/youtube` - Ses kanalında YouTube Together başlatır.\n" +
          "`/token` - Botun tokenini verir (şaka)."
      },
      logoy: {
        title: "🎨 Logo Komutları",
        desc:
          "`/logo [stil] [yazi]` - Yazdığınız mesajı seçilen stilde profesyonel logoya dönüştürür.\n\n" +
          "**Kullanılabilir Stiller (22 Adet):**\n" +
          "• `Alev`, `Alev 2`, `Altın`, `Anime`, `Banner`, `Basit`, `Buz`\n" +
          "• `Dinamik`, `Discord`, `Elmas`, `Google`, `Grafiti`, `Yeşil`, `Gökkuşağı`\n" +
          "• `Hobbo`, `Kalın`, `Kurdele`, `Kırmızı`, `Müzik`, `Neon Mavi`, `Odun`, `Sarı`"
      },
      gıfy: {
        title: "🎬 GIF Komutları",
        desc:
          "`/gif [kategori] [kullanici]` - Seçilen kategoriden rastgele animasyonlu GIF gönderir.\n\n" +
          "**Kategoriler (6 Adet):**\n" +
          "• `Anime`, `Hayvan (Animal)`, `Bebek (Baby)`, `Çift (Couple)`, `Erkek (Man)`, `Kadın (Woman)`"
      },
      mody: {
        title: "🛡️ Moderasyon Komutları",
        desc:
          "`/ban [at | force | liste | say]` - Sunucudan üye yasaklama yönetimi.\n" +
          "`/unban [kullanici_id]` - Belirtilen ID'nin yasağını kaldırır.\n" +
          "`/kick [kullanici] [sebep]` - Kullanıcıyı sunucudan atar.\n" +
          "`/timeout [kullanici] [sure] [sebep]` - Kullanıcıya zaman aşımı (susturma) uygular.\n" +
          "`/sil [miktar]` - Belirtilen miktarda mesajı toplu siler.\n" +
          "`/lock` - Komutun kullanıldığı kanalı kilitler.\n" +
          "`/unlock` - Kilitli kanalın kilidini açar.\n" +
          "`/nuke` - Kanalı klonlayıp mesajları sıfırlar.\n" +
          "`/yavaş-mod [saniye] [kanal]` - Kanalın yavaş mod süresini ayarlar.\n" +
          "`/koruma [capslock | reklam | saas]` - Otomatik filtre ve koruma sistemleri.\n" +
          "`/otocevap [ekle | sil]` - Özel otomatik yanıt sistemi.\n" +
          "`/ototag [ayarla | sifirla | herkese-ver]` - Sunucuya yeni girenlere otomatik tag.\n" +
          "`/log [mesaj | hgbb]` - Mesaj ve giriş-çıkış log kanalları.\n" +
          "`/rol [ver | al | olustur | toplu-ver]` - Rol verme, alma ve yönetim işlemleri.\n" +
          "`/snipe` - Bu kanalda son silinen mesajı gösterir."
      },
      swy: {
        title: "🏢 Sunucu & Kanal Komutları",
        desc:
          "`/sunucu bilgi` - Sunucunun detaylı bilgilerini görüntüler.\n" +
          "`/sunucu resim` - Sunucunun profil simgesini görüntüler.\n" +
          "`/sunucu roller` - Sunucudaki tüm rolleri listeler.\n" +
          "`/sunucu kurucu` - Sunucu kurucusunu gösterir.\n" +
          "`/sunucu yetkilerim` - Sunucudaki izinlerinizi listeler.\n" +
          "`/sunucu emoji-ekle` - Sunucuya emoji ekler.\n" +
          "`/kanal yazi-ac` - Yeni bir metin kanalı oluşturur.\n" +
          "`/kanal ses-ac` - Yeni bir ses kanalı oluşturur.\n" +
          "`/kanal isim-degis` - Kanalın adını değiştirir.\n" +
          "`/kanal aciklama` - Kanalın açıklamasını/konusunu değiştirir.\n" +
          "`/kanal bilgi` - Kanal hakkında detaylı bilgi verir.\n" +
          "`/emojiler` - Sunucudaki tüm emojileri listeler."
      },
      kayıty: {
        title: "📝 Kayıt Sistemi",
        desc:
          "`/kayit kur` - Erkek, kız, kayıtsız ve yetkili rolleri ile kanalları ayarlar.\n" +
          "`/kayit sifirla` - Kayıt sistemini sıfırlar.\n" +
          "`/kayit erkek [uye] [isim] [yas]` - Üyeyi erkek olarak kaydeder.\n" +
          "`/kayit kiz [uye] [isim] [yas]` - Üyeyi kız olarak kaydeder.\n" +
          "`/kayit sayi [yetkili]` - Yetkilinin kayıt istatistiklerini görüntüler.\n" +
          "`/kayit tag [gor | ayarla | sifirla]` - Kayıt tagı ayarları."
      },
      aby: {
        title: "🔔 Abone Sistemi",
        desc:
          "`/abone ver [kullanici]` - Belirttiğiniz kullanıcıya abone rolü verir.\n" +
          "`/abone rol-ayarla [rol]` - Abone rolünü belirler.\n" +
          "`/abone rol-sifirla` - Abone rolünü sıfırlar.\n" +
          "`/abone yetkili-ayarla [rol]` - Abone yetkilisi rolünü belirler.\n" +
          "`/abone yetkili-sifirla` - Yetkili rolünü sıfırlar.\n" +
          "`/abone sayi [yetkili]` - Yetkilinin abone verme sayısını görüntüler."
      },
      eksy: {
        title: "💰 Ekonomi Sistemi",
        desc:
          "`/ekonomi gunluk` - Günlük ücretsiz SSCoin ödülünüzü alırsınız.\n" +
          "`/ekonomi bakiye [kullanici]` - Cüzdan ve banka bakiyesini görüntüler.\n" +
          "`/ekonomi hesap [islem: ac/kapat]` - Banka/Ekonomi hesabı açar veya kapatır.\n" +
          "`/ekonomi gonder [kullanici] [miktar]` - Başka bir üyeye SSCoin transfer eder.\n" +
          "`/ekonomi calis [alan: orman/maden]` - Kaynak toplamak için çalışırsınız.\n" +
          "`/ekonomi canta [kullanici]` - Çantanızdaki alet ve madenleri görüntüler.\n" +
          "`/ekonomi market [islem: liste/al/sat]` - Marketten ürün alır veya satarsınız.\n" +
          "`/ekonomi banka [islem: durum/kur/kapat/yatir/cek]` - Banka işlemleri."
      },
      ssy: {
        title: "📈 Seviye Sistemi",
        desc:
          "`/seviye rank [kullanici]` - Resimli rank/seviye kartınızı görüntüler.\n" +
          "`/seviye ayarla [islem: durum/log/tebrik]` - Seviye log kanalı ve tebrik mesajı ayarları."
      },
      dsy: {
        title: "🔒 Doğrulama Sistemi",
        desc:
          "`/dogrulama kur [kanal] [rol]` - Resimli captcha güvenlik doğrulamasını kurar.\n" +
          "`/dogrulama sifirla` - Doğrulama sistemini sıfırlar."
      },
      psy: {
        title: "🤝 Partnerlik Sistemi",
        desc:
          "`/partner ol [sunucu_id]` - Belirtilen ID'deki sunucuya partnerlik teklifi gönderir.\n" +
          "`/partner kanal [kanal]` - Partner reklamlarının atılacağı kanalı belirler.\n" +
          "`/partner log [kanal]` - Partner isteklerinin düşeceği kanalı belirler.\n" +
          "`/partner yazi [metin]` - Sunucunuzun partner tanıtım yazısını belirler."
      },
      çsy: {
        title: "🎉 Çekiliş Sistemi",
        desc:
          "`/cekilis baslat` - Açılır pencere (Modal) ile çekiliş başlatır.\n" +
          "`/cekilis bitir [mesaj_id]` - Devam eden çekilişi hemen sonlandırır.\n" +
          "`/cekilis yenile [mesaj_id]` - Çekilişi yeniden çekerek yeni kazanan belirler."
      },
      bsy: {
        title: "🤖 Bot List Sistemi",
        desc:
          "`/botlist kur` - Botlist başvuru, onay, bot ve geliştirici rollerini kurar.\n" +
          "`/botlist kapat` - Botlist sistemini sıfırlar."
      },
      ysy: {
        title: "📋 Yetkili Alım Sistemi",
        desc:
          "`/basvuru yap` - Başvuru formunu butonla açar.\n" +
          "`/basvuru kur [kanal] [log] [rol]` - Yetkili alım sistemini kurar.\n" +
          "`/basvuru kapat` - Yetkili alım sistemini kapatır."
      },
      owy: {
        title: "👑 Bot Sahibi Komutları",
        desc:
          "`/sahip sunucular` - Botun bulunduğu sunucuları listeler.\n" +
          "`/sahip dmyaz [kullanici] [mesaj]` - Bot üzerinden kullanıcıya DM atar.\n" +
          "`/sahip durum [yazi] [tip]` - Botun aktivite durumunu değiştirir.\n" +
          "`/sahip ayril [sunucu_id]` - Botu sunucudan çıkarır.\n" +
          "`/eval [kod]` - JavaScript kodu çalıştırır."
      }
    };

    collector.on('collect', async i => {
      const selected = i.values[0];
      const categoryData = HELP_DATA[selected];

      if (categoryData) {
        const catEmbed = new MessageEmbed()
          .setTitle(categoryData.title)
          .setColor("#5865F2")
          .setDescription(categoryData.desc)
          .setFooter({ text: `SwankyBot Yardım • Toplam Komut: ${client.slashcommands.size}`, iconURL: client.user.avatarURL() })
          .setTimestamp();

        await i.update({ embeds: [catEmbed] }).catch(() => {});
      }
    });
  }
};