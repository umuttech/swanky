const Discord = require("discord.js")

module.exports = {
    slash: false, //kodun slash olmadığını belirttik.
    name: ['slots'], //arraya istediğiniz kadar kullanım yazabilirsiniz alieses gibi saçma bir şeyle uğraşmak yerine direk arraya ekleyebilirsiniz.
    description: "Slots oyunu oynarsınız.",
    kategori: "Eğlence",
    async execute(client, message, args) {
       
        let s = ["🍎", "🍊", "🍐", "🍋", "🍉"]
        let s1 = s[Math.floor(Math.random() * s.length)]
        let s2 = s[Math.floor(Math.random() * s.length)]
        let s3 = s[Math.floor(Math.random() * s.length)]
        if(s1 === s2 && s2 === s3 && s3 === s1) {
            return message.reply(`Tebrikler kazandınız ${s1} ${s2} ${s3}`)
        } else if(s1 === s2 || s2 === s3 || s3 === s1) {
            return message.reply(`Tebrikler kazandınız ${s1} ${s2} ${s3}`)
        } else {
            return message.reply(`Kaybettiniz ${s1} ${s2} ${s3}`)
        }
      
    }
}