module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['fakemesaj'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Fake mesaj gönderirsiniz.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
  await message.delete().catch(() => {});
  const csu = message.mentions.users.first();
  const msg = args.slice(1).join(" ");
  if (!csu) return message.channel.send({ content: "Birisini Etiketle!" }).then(m => setTimeout(() => m.delete().catch(() => {}), 5000));
  if (!msg) return message.channel.send({ content: "Bir Mesaj Yaz!" }).then(m => setTimeout(() => m.delete().catch(() => {}), 5000));

  try {
    const hook = await message.channel.createWebhook(csu.username, {
      avatar: csu.displayAvatarURL({ dynamic: true })
    });
    await hook.send({ content: msg });
    setTimeout(() => hook.delete().catch(() => {}), 1000);
  } catch (err) {
    console.error('[fakemesaj] Hata:', err);
  }
      
    }
}