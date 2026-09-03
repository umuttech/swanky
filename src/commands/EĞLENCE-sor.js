const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['sor'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Bota soru sorarsınız o da rastgele bir cevap verir.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
  const cevaplar = [                  'Bu kesin.',
                                    'Kesinlikle öyle.',
                                    'Kuşkusuz.',
                                    'Evet, Kesinlikle.',
                                    'Buna güvenebilirsin.',
                                    'Gördüğüm kadarıyla, Evet.',
                                    'Büyük olasılıkla.',
                                    'Görünüşe göre, iyi.',
                                    'Evet.',
                                    'İşaretler eveti gösteriyor.',
                                    'Anlayamadım, tekrar edin.',
                                    'Daha sonra sor.',
                                    'Şimdi söylemesen iyi olur.',
                                    'Tahmin edemiyorum...',
                                    'Konsantre ol ve tekrar sor.',
                                    'Buna güvenme.',
                                    'Cevabım, hayır.',
                                    'Kaynaklarım hayır diyor.',
                                    'Görünüşe göre, bu iyi değil.',
                                    'Çok şüpheli.',
                                    'Şüpheli.',
                                    'Büyük olasılıkla, hayır.',
                                    'İçgüdüm, hayır diyor.',
                                    'Kararsız kaldım, bidaha sormaya ne dersin?',
                                    'Hmm, hayır.',
                                    'Evvet kesinlikle.',
                                    'Emin değilim, kötü olabilir.',
                                    'İyi ya iyi.',
                                    'Kararsızım.'
];

exports.run = function(client, message, args) {
    var soru = args.join(' ');

    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

    if(!soru) return message.reply('Bana bir soru sormalısın! \n**Örnek**: +sor <soru>')
    else message.channel.send({embeds: [soru]})
      
    }
  }

}