const { MessageEmbed, Permissions, Client, CommandInteraction } = require("discord.js");
module.exports = {
    slash: true,
    name: ['ban'],
    description: 'Kullanıcıyı Sunucudan Yasaklarsınız',
    option: [
        {
            name: "kullanıcı",
            description:"Yasaklanacak Kullanıcıyı Seçin",
            type: 'user',
            require: true
        },
        {
            name: "sebep",
            description:"Hangi Sebepten dolayı yasaklanacak?",
            type: 'string',
            require: true
        },
    ],
    async execute(client, interaction) {


       if(
           interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
           
        )
        {
           
            const user = interaction.options.getMember('kullanıcı')
            const sebep = interaction.options.getString('sebep')

            if(user.id == interaction.member.id) return interaction.reply({content:"Kendini Yasaklayamazsın",ephemeral:true})
            if(user.id == client.user.id) return interaction.reply({content:"Kendimi Yasaklayamam",ephemeral:true})
            if(user.id == interaction.guild.ownerID) return interaction.reply({content:"Sevgili Sunucu Sahibini Yasaklayamazsın",ephemeral:true})
            if(user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({content:"Bu Kullanıcıyı Yasaklayamazsın",ephemeral:true})

            try{
    
            
            await interaction.guild.bans.fetch(user.id)
            .then(() => { interaction.reply("Bu Kullanıcı zaten yasaklanmış"); })
            }
        
        catch{
                user.ban({reason: sebep});
                const embed = new MessageEmbed()
                .setAuthor({name:interaction.member.user.tag,iconURL:interaction.member.user.avatarURL({dynamic:true})})
                .setDescription(`<@!${user.id}> isimli kullanıcı yasaklandı
Sebep: \`${sebep}\``)
                .setColor("RED");
                interaction.reply({embeds:[embed]});
        
        }
    }
    else
       return interaction.reply({content:"Bu komutu kullanmak için yetkiniz yok",ephemeral:true});
           
}
};