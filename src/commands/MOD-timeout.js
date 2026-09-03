const Discord = require("discord.js")
const ayarlar = require("../base/settings.json")
const fetch = require('node-fetch');
const ms = require('ms');

module.exports = {
    slash: false, //slash komut olup olmadığını yaz
    name: ['timeout'],
    description: "Belirttiğiniz kullanıcıya belirttiğiniz süre kadar zaman aşımı atar.",
    kategori: "Moderasyon",
    async execute(client, message, args) {
      
		const time = args.slice(1).join(' ');

      const embed1 = new Discord.MessageEmbed()
      .setTitle("Lütfen Bir Zaman ve Sebep Belirt!")
      .setDescription(`\`1m\` - \`1 Dakika\` 
\`1h\` - \`1 Saat\` 
\`1d\` - \`1 Gün\` 
\`1w\` - \`1 Hafta\``)
      
      
		if(!time) return message.channel.send({embeds: [embed1]});

		const user = message.mentions.users.first();
		const milliseconds = ms(time);

		if(!user) return message.reply('Lütfen bir kullanıcı belirtin!');
		if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) {
			return message.reply('Geçersiz bir zaman girdiniz tekrar deneyin!');
		}

		const time2 = new Date(Date.now() + milliseconds).toISOString();

		await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ communication_disabled_until: time2 }),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bot ${client.token}`,
			},
		});

const embed = new Discord.MessageEmbed()
  .setTitle(`SwankyBot - Zaman Aşımı`)
  .setDescription(`<@${user.id}> adlı kullanıcı \`${time.toString().replace(/(minute|min|m)/, ' Dakika').replace(/(week|w)/, ' Hafta').replace(/(days|day|d)/, ' Gün').replace(/(seconds|second|sec|s)/, ' Saniye').replace(/(hours|hour|h)/, ' Saat')}\` Susturuldu!`)
  .setColor('RANDOM')
  .setFooter(`ID: ${user.id}`)
  .setTimestamp()
message.channel.send({ embeds: [embed] });


    }
}