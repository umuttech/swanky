module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['kaçcm'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Malafatının uzunluğunu söyler.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
   message.reply('Hemen Diyorum Abi 1 Saniye..').then(message => {
      var espri = Math.floor(Math.random() * 100) * 1
            message.edit(`Malafatının uzunluğu **${espri}cm** :eggplant: :flushed:`);
 });
    }
}