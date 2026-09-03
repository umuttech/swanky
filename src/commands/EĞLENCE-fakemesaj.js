module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['fakemesaj'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Fake mesaj gönderirsiniz.",
    kategori: "Eğlence",
    async execute(lient, message, args) {
       
  await message.delete();
  const csu = message.mentions.users.first();
  const msg = args.slice(1).join(" ");
  if (!csu) return message.channel.send({ content: "Birisini Etiketle!"}).then(m => m.delete({ timeout: 50000 }));
  if (!msg) return message.channel.send({ content: "Bir Mesaj Yaz!"}).then(m => m.delete({ timeout: 50000 }));

  const hook = await message.channel
    .createWebhook(csu.username, {
      avatar: csu.avatarURL()
    })
    .then(async a => {
      await a.send({ contetnt: msg});
      a.delete({ timeout: 100 });
    });
      
    }
}