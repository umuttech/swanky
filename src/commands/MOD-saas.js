const { MessageEmbed , MessageButton , MessageActionRow , MessageSelectMenu} = require("discord.js")
module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['saas'],
    description: "Selam alma sistemini açar/kapatır.",
    kategori: "Moderasyon",

  async execute(client,message,args) {
    const embed = new MessageEmbed()
    .setDescription(`**Selam alma sistemini aşağıdaki butonlardan açıp kapatabilirsin.**`)
        const row = new MessageActionRow()
          .addComponents(
    new MessageButton()
                    .setCustomId('saason')
                    .setLabel('Aç')
                    .setStyle('SUCCESS'),
          new MessageButton()
                    .setCustomId('saasoff')
                    .setLabel('Kapat')
                    .setStyle('DANGER'),
            );
   await message.channel.send({components: [row],embeds:[embed]})
    }
}