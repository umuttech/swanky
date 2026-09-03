//slash commandlar bu şekilde olmalı isteğe göre options sayısını azaltıp arttırabilirsiniz.

const Discord = require("discord.js");
module.exports = {
    slash: true,
    name: ['avatar'],
    description: "Kullanıcının avatarını gösterir.",
    option: [
        {
            name:"kullanıcı",
            description:"Kullanıcı avatar",
            type: "user",
            require: false
        }
    ],

    async execute(client, interaction) {
       
        let member = interaction.options.getMember("kullanıcı") || interaction.member;

        interaction.reply({ embeds: [{
          title: `${member.user.tag}`,
          description: `[AVATAR LINK](${member.user.displayAvatarURL({ size: 1024})})`,
          color: `#fffff`,
          image: { url: member.user.displayAvatarURL({ size: 512, dynamic: true })}
          }] })
       
    }
}