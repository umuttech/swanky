const Discord = require("discord.js"); //V13
const client = new Discord.Client({intents: 98303})

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['espri'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Espri yapar.",
    karegori: "Eğlence",
    async execute(client, message, args) {
        
        message.channel.send({ content: "Espri yükleniyor."}).then(message => {
    var espriler = [
      "Seni görünce; \ngözlerim dolar, \nkulaklarım euro.",
      "Kar üzerinde yürüyen adama ne denir. Karabasan.",
      "Yıkanan Ton’a ne denir? Washington!",
      "Gidenin arkasına bakmayın yoksa geleni göremezsiniz.",
      "+Oğlum canlılara örnek ver. \n-Kedi, köpek. \n+Cansızlara örnek ver. \n-Ölü kedi, ölü köpek.",
      "+Kanka ben banyoya 3 kişi giriyom. \n-Oha nasıl? \n+Hacı, Şakir ve ben. \n-Defol lan!",
      "+Kocanızla ortak özelliğiniz ne? \n-Aynı gün evlendik.",
      "+Evladım ödevini neden yapmadın? \n-Bilgisayarım uyku modundaydı, uyandırmaya kıyamadım.",
      "+Bizim arkadaş ortamında paranın lafı bile olmaz. \n-Niye ki? \n+Çünkü hiç birimizin parası yok.",
      "Annemin bahsettiği elalem diye bir örgüt var illuminatiden daha tehlikeli yemin ederim.",
      "+Acıkan var mı ya? \n-Yok bizde tatlı kan var.",
      "Yılanlardan korkma, yılmayanlardan kork.",
      "+Baykuşlar vedalaşırken ne der? \n-Bay bay baykuş.",
      "Beni Ayda bir sinemaya götürme, Marsta bir sinemaya götür.",
      "Aaa siz çok terlemişsiniz durun size terlik getireyim.",
      "Aklımı kaçırdım, 100.000 TL fidye istiyorum.",
      "Rock yapmayan kişiye ne denir? -Yaprock",
      "Ben Yedigün içiyorum sen Onbeşgün iç. :D",
      "Sinemada on dakika ara dedi, aradım aradım açmadı.",
      "Yeni yapılmış resimlere ne denir? -Nevresim",
      "Tebrikler kazandınız, şimdi tencere oldunuz!",
      "İshal olmuş böceğe ne denir? -Cırcır Böceği",
      "keklik askere giderse nolur? -Erkeklik",
      "Bizim CD sürücümüz ehliyeti nerden almış acaba ?!",
      "Yılanlardan korkma, yılmayanlardan kork.",
      "Kırmızı giyen erkeğe ne denir? -Albay",
      "Ben kahve içiyorum, Nurgül Yeşilçay.",
      "Bak şu karışıdaki uçak PİSTİ , ama bir türlü temizlemediler.",
      "Top ağlarda, ben ağlamaz mıyım ?",
      "Burger King, bende vezir",
      "Birgün Sabahattin ali anasına çöpü verde atayım demiş anneside sabah attın Ali demiş"
    ];
    var espri = espriler[Math.floor(Math.random() * espriler.length)];
    message.edit({ content: `${espri}`});
  });
      
    }
}