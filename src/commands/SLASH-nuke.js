const { MessageEmbed,CommandInteraction,Client,Permissions } = require("discord.js");
module.exports = {
    slash: true,
    name: ['nuke'],
    description: 'Belirttiğiniz kanalı sıfırlar.',
    options:[],
  
    async execute(client, interaction) {

        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({content: `Bu komutu kullanamazsın.`, ephemeral: true});

       let kanal = interaction.channel
       kanal.clone(kanal.name, {reason: "Yeniden oluşturma"}).then(async knl => {
           knl.setPosition(kanal.position);
           kanal.delete();
           knl.send(`<a:armors_onay:990226710924521502> Kanal Başarılı bir şekilde sıfırlandı.`)
        })
}
};