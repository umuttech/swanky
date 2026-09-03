const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['komutlar'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Bottaki komutları gösterir.",
    kategori: "Genel",
    async execute(client, message, args) {
      
          try {
      
      const embed = new Discord.MessageEmbed()
      .setColor("BLACK").setTitle("Komutlar")
      .setDescription(`${client.commands.map(props => `${props.name}`).join(" **|** ")}`);
        await message.channel.send({embeds: [embed]})
    } catch (e) {
        throw e;
    }
       
    }
}