const figlet = require("figlet")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['ascii'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Ascii şeklinde yazı yazmanızı sağlar.",
    kategori: "Eğlence",
    async execute(lient, message, args) {
       
        var sınır = 75 // Kendiniz en yüksek harf sayısını ayarlayabilirsiniz
  
  if(args.join(' ').length > sınır) return message.reply(`Çok karakter yazdınız. En fazla ${sınır} karakter yazabilirsin!`) 
     if(!args[0]) return message.reply('Lütfen geçerli yazı giriniz.');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('Bir hata var...');
          console.dir(err);
          return;
      }

      message.reply("```css\n" + data + "\n```");

  });

      
    }
}
