const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['okşa'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Belirttiğiniz kişiyi okşarsınız.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
  let mem = message.mentions.users.first();
  if (!mem)
    return message.channel.send(
      "Okşamak istediğin kullanıcıyı etiketlemelisin!"
    );

  const req = require("request");
  req(
    {
      url: "https://nekos.life/api/pat",
      json: true
    },
    (req, res, json) => {
      let embed = new Discord.MessageEmbed()
        .setTitle(
          message.author.username +
            ", " +
            mem.username +
            " adlı kullanıcıyı okşuyor!"
        )
        .setColor("AQUA")
        .setImage(json.url);
      message.channel.send({embeds: [embed]});
    }
  );
      
    }
}