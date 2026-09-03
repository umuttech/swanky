const Discord = require("discord.js");
const canvacord  = require("canvacord");
const db = require("nrc.db")
const ayarlar = require('../base/settings.json')


module.exports = {
    slasj: false,
    name: ['rank'],
    description: "Seviyenizi görürsünüz.",
    kategori: "Seviye",
    async execute(client, message, args) {
        
        let user = message.mentions.users.first() || message.author;
        let xp = db.fetch(`xp_${message.guild.id}_${user.id}`)
        let lvl = db.fetch(`lvl_${message.guild.id}_${user.id}`)

        
        const card = "https://cdn.discordapp.com/attachments/984752154998898738/1036364777653534801/photo-1439792675105-701e6a4ab6f0.jpg"
    const rank = new canvacord.Rank()
    .setAvatar(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`)
    .setCurrentXP(Number(xp))
    .setLevel(Number(lvl))
    .setRequiredXP(Number(100))
    .setStatus(message.guild.members.cache.get(user.id).presence.status)
    .setProgressBar("#000001", "COLOR")
    .setUsername(user.username)
    .setRankColor('transparent', 'transparent')
    .setBackground('IMAGE',`${card ? card : 'https://cdn.discordapp.com/attachments/984752154998898738/1036364777653534801/photo-1439792675105-701e6a4ab6f0.jpg'}`)
    .setDiscriminator(user.discriminator);
  

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, `SwankyBotRankCard-${message.author.username}.png`);
        message.channel.send({files:[attachment]})
    })



}
}