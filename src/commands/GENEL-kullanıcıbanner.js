const Discord = require("discord.js")
const fetch = require('node-fetch');
const token =  'ODk5ODI1MTYzNjk5MzU1NjY4.G3QTK3.X9iGB6azOjpAdVlfbugthA3DzRUxfuyV2i0WnY'

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['kbanner'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Sizin veya belirttiğiniz kullanıcnın bannerını gösterir.",
    kategori: "Genel",
    async execute(client, message, args) {
      
          const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let uid = user.id
    let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${token}`
        }
    })
    let receive = ''
    let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif'
    response.then(a => {
        if (a.status !== 404) {
            a.json().then(data => {
                receive = data['banner']

                if (receive !== null) {

                    let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${token}`
                        }
                    })
                    let statut = ''
                    response2.then(b => {
                        statut = b.status
                        banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                        if (statut === 415) {
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                        }})}})}})

    setTimeout(() => {
        if (!receive) return message.reply("Bu kullanıcının banneri yok!")
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.tag + ' adlı kullanıcının bannerı', user.displayAvatarURL())
            .setColor("RANDOM")
            .setImage(banner)
        message.channel.send({embeds:[embed]})
    }, 1000)
       
    }
}