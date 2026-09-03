const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['man'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Rastgele bir man gif atar.",
    kategori: "Gif",
    async execute(client, message, args) {
      
      
      
    let replies = ["https://cdn.discordapp.com/attachments/746824654840135761/1011351450527469669/e799289dfa8207ad79e4aefc456f34db.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1010994301951541248/9814F00C-199A-4453-BDDB-8C77C0F4B24A.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1010992535834992850/258DCC95-26C2-4658-AFEF-B0B4FD784B9B.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1010711225111433318/Man_PP_Gif_85.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1010711224868159608/Man_PP_Gif_88.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1010660785392996423/a_68741017edf1f607feda61aa9a1d644d.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1010649345965695087/Man_PP_Gif_95.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1010649344829042768/Man_PP_Gif_92.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1010649282870784010/Man_PP_Gif_89.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1005865421032931449/hit_gif_43.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1005865035417002004/hit_gif_6.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1005865033781231617/hit_gif_41.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1005864685146480793/hit_gif_42.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1005448184732078091/gif_136.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1005134909821702185/damkdwa.gif", "https://cdn.discordapp.com/attachments/746824654840135761/1005134910174007416/a_553c763897b352cafffccfa9317a6d63-1.gif"];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.MessageEmbed()
        .setTitle("SwankyBot - Man Gif")
        .setColor("BLACK")
        .setFooter(`${message.author.tag} `, message.author.avatarURL)
        .setImage(replies[result]);



    message.channel.send({embeds: [gifembed]})
       
    }
}