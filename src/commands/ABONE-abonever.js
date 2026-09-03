const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  slash: false,
  name: ['a'],
  description: "Belirttiğiniz kullanıcıya abone rolü verirsiniz.",
  kategori: "Abone",
  
  async execute(client, message, args) {
  if (!message.member.roles.cache.has(db.fetch(`aboneyetkili_${message.guild.id}`)))// Abone Sorumlusu id
    return message.reply(`Bu komutu kullanabilmek için \`Abone Yetkilisi\` rolüne sahip olmasınız.`);
  let kayıtsayı = db.fetch(`abonesayı_${message.author.id}_${message.guild.id}`) || '0'
  let abonerol = db.fetch(`abonerol_${message.guild.id}`)

  let member = message.mentions.members.first();
  if (!member)
    return message.reply("Bir Kullanıcı Etiketlemen Gerekiyor!")
  member.roles.add(abonerol) //abone rolü idsi
  let aboneembed = new Discord.MessageEmbed()
   .setTitle("Abone Rolü Verildi")
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`${message.author} Adlı Yetkilinin Abone Rolü Verdiği Kullanıcı Sayısı: **${kayıtsayı ? `${kayıtsayı}` : "0"}**`)
        .addField("Rol Veren Yetkili", `${message.author}`, true)
        .addField("Rol Verilen Kullanıcı", `${member}`, true)
        .setColor("#7e7e7e")
        .setFooter(client.user.username + ' Abone Sistemi', client.user.avatarURL())
        .setTimestamp();

    message.reply({ embeds: [aboneembed]})
  db.add(`abonesayı_${message.author.id}_${message.guild.id}`, 1)

}}