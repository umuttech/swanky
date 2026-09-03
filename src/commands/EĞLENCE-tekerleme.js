const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['tekerleme'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Bot rastgele bir tekerleme atar.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
var box = [
"Götür küpü, dök küpü. Getir küpü dök küpü",
"GüI dibi, büIbüI diIi gibi",
"Çarşıda koza ucuz, çarşıda darı ucuz, çarşıda boza da ucuz mu?",
"FaIcı, faIcının faIına, fasa fiso dedi.",
"O pikap, şu pikap, bu pikap.",
"Sudan çıktı iki su şadısı, biri erkek şu şadısı, diğeri dişi şu şadısı.",
"Keşkekçinin keşkekIenmiş keşkek kepçesi.",
"Bu evi yıkıp yapsak da mı otursak, yoksa yıkmasak onarsak da mı otursak?",
"ÇataIcada topaI çoban çataI yapıp çataI satar, nesi için çataIcada topaI çoban çataI yapıp çataI satar?",
"Dört deryanın deresini dört dergâhın derbendine devrederIerse, dört deryadan dört dert, dört dergâhtan dört dev çıkar.",
"Sen seni biI, sen seni, biI sen seni, biI sen seni, sen seni biImezsen patIatırIar enseni.",
"Gagavuz kuşunun gagası gerdandan sarkar, ger ger gerilen gergefin gültası Galata’dan galat gergedana gül atar.",
"Sudan çıktı iki su şadısı, biri erkek şu şadısı, diğeri dişi şu şadısı.",
"Bu evi yıkıp yapsak da mı otursak, yoksa yıkmasak onarsak da mı otursak?",
"El alem ala dana aldı aladanalandı da biz bir ala dana alıp aladanalanamadık."
]
const tonslip = box[Math.floor(Math.random() * box.length)];

const embed = new Discord.MessageEmbed()
.setTitle("Tekerleme")
.setDescription(tonslip)
  message.channel.send({embeds: [embed]});
      
    }
}