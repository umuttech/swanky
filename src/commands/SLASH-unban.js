const { MessageEmbed,Permissions } = require("discord.js");
module.exports = {
    slash: true,
    name: ['unban'],
    description: 'Belirlenen kullanının yasağını kaldırır',
    option: [
        {
            name:"kullanıcı_id",
            description:"Yasağı kaldılacak Kullanıcıyı Seçin",
            type:'string',
            require: true
        }
    ],
    async execute(client, interaction) {


        if(
            interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
            
         ){
            const id = interaction.options.getString('kullanıcı_id')
            try{
                await interaction.guild.bans.fetch(id)
                .then(() =>{
                 
                      interaction.guild.members.unban(id);
                      
                      const embed = new MessageEmbed()
                      .setAuthor({name:interaction.member.user.tag,iconURL:interaction.member.user.avatarURL({dynamic:true})})
                      .setDescription(`<@!${id}> isimli kullanıcının yasağı kaldırıldı`)
                      .setColor("GREEN");
                      interaction.reply({embeds:[embed]});
                })
            }
             catch{  interaction.reply({content:'Kullanıcı Bulunamadı',  ephemeral: true}) }    
            }
        else  return interaction.reply({content:"Bu komutu kullanmak için yetkiniz yok!",ephemeral:true});
    }
};