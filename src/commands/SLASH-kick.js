const { MessageEmbed, Permissions, Client, CommandInteraction } = require("discord.js");
module.exports = {
    slash: true,
    name: ['kick'],
    description: 'Kullanıcıyı Sunucudan Atar.',
    option: [
        {
            name:"kullanıcı",
            description:"Atılacak Kullanıcıyı Seçin",
            type: 'user',
            require :true
        },
        {
            name:"sebep",
            description:"Hangi nedenden dolayı atılacak",
            type: 'string',
            require :true
        }
    ],
    async execute(client, interaction) {


       if(
           interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)
           
        )
        {
           
            const user = interaction.options.getMember('kullanıcı')
            const sebep = interaction.options.getString('reason')

            if(user.id == interaction.member.id) return interaction.reply({content:"Kendini Atamazsın",ephemeral:true})
            if(user.id == client.user.id) return interaction.reply({content:"Kendimi Atamam",ephemeral:true})
            if(user.id == interaction.guild.ownerID) return interaction.reply({content:"Sevgili Sunucu Sahibini Atamazsın",ephemeral:true})
            if(user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({content:"Bu Kullanıcıyı atamazsın",ephemeral:true})

            try{
    
            
            interaction.guild.members.fetch(user.id)
            .then(() => { interaction.reply({embeds:[{description:"Bu Kullanıcı zaten bu sunucda yok"}]}); })
            }
        
        catch{
                await user.kick(sebep);
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