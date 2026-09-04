const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require("discord.js");
const Canvas = require("canvas");

const GIFS = {
  kiss: [
    "https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif",
    "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
    "https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif",
    "https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif"
  ],
  slap: [
    "https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif",
    "https://media.giphy.com/media/j3iGKfXRKlLqw/giphy.gif",
    "https://media.giphy.com/media/Zau0yrl15uzdK/giphy.gif",
    "https://media.giphy.com/media/mEtSQlxqBtWWA/giphy.gif"
  ],
  oksa: [
    "https://media.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif",
    "https://media.giphy.com/media/ARSp9T7wwxNcs/giphy.gif",
    "https://media.giphy.com/media/ye7OTQgwmVuNTY22s3/giphy.gif"
  ]
};

module.exports = {
  slash: true,
  name: ['etkilesim'],
  description: 'Sosyal etkileşim komutları (öp, okşa, tokatla, ship, teklif et).',
  subcommands: [
    {
      name: 'op',
      description: 'Belirttiğiniz kullanıcıyı öpersiniz.',
      options: [
        { name: 'kullanici', description: 'Öpmek istediğiniz kullanıcı', type: 'user', require: true }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('kullanici');
        const list = GIFS.kiss;
        const gif = list[Math.floor(Math.random() * list.length)];

        const embed = new MessageEmbed()
          .setTitle("💋 Muck!")
          .setColor("FUCHSIA")
          .setDescription(`${interaction.user}, ${target} kullanıcısını tatlıca öptü!`)
          .setImage(gif);

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'oksa',
      description: 'Belirttiğiniz kullanıcının başını okşarsınız.',
      options: [
        { name: 'kullanici', description: 'Başını okşamak istediğiniz kullanıcı', type: 'user', require: true }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('kullanici');
        const list = GIFS.oksa;
        const gif = list[Math.floor(Math.random() * list.length)];

        const embed = new MessageEmbed()
          .setTitle("🥰 Pıt pıt...")
          .setColor("LUMINOUS_VIVID_PINK")
          .setDescription(`${interaction.user}, ${target} kullanıcısının başını sevgiyle okşadı.`)
          .setImage(gif);

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'tokatla',
      description: 'Belirttiğiniz kullanıcıya Osmanlı tokadı atarsınız.',
      options: [
        { name: 'kullanici', description: 'Tokatlamak istediğiniz kullanıcı', type: 'user', require: true }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('kullanici');
        const list = GIFS.slap;
        const gif = list[Math.floor(Math.random() * list.length)];

        const embed = new MessageEmbed()
          .setTitle("👋 ŞAAAP!")
          .setColor("RED")
          .setDescription(`${interaction.user}, ${target} kullanıcısına sert bir tokat attı!`)
          .setImage(gif);

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'ship',
      description: 'İki kullanıcı veya kendinizle bir kullanıcı arasındaki aşk oranını ölçer.',
      options: [
        { name: 'kullanici', description: 'Eşleştirilecek kullanıcı', type: 'user', require: true },
        { name: 'kullanici2', description: 'İkinci kullanıcı (opsiyonel, boş bırakılırsa siz olursunuz)', type: 'user', require: false }
      ],
      async execute(client, interaction) {
        await interaction.deferReply();
        const user1 = interaction.options.getUser('kullanici2') || interaction.user;
        const user2 = interaction.options.getUser('kullanici');

        const canvas = Canvas.createCanvas(600, 250);
        const ctx = canvas.getContext("2d");

        // Background
        ctx.fillStyle = "#2c2f33";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        try {
          const av1 = await Canvas.loadImage(user1.displayAvatarURL({ format: 'png', size: 256 }));
          const av2 = await Canvas.loadImage(user2.displayAvatarURL({ format: 'png', size: 256 }));

          ctx.drawImage(av1, 50, 25, 200, 200);
          ctx.drawImage(av2, 350, 25, 200, 200);

          const random = Math.floor(Math.random() * 101);

          ctx.font = 'bold 50px sans-serif';
          ctx.fillStyle = random >= 50 ? '#ff4d6d' : '#888888';
          ctx.textAlign = 'center';
          ctx.fillText(random >= 50 ? '❤️' : '💔', 300, 120);

          ctx.font = 'bold 30px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`%${random}`, 300, 175);

          const attachment = new MessageAttachment(canvas.toBuffer(), 'ship.png');
          return interaction.editReply({
            content: `💞 **${user1.username}** ile **${user2.username}** arasındaki aşk uyumu: **%${random}**`,
            files: [attachment]
          });
        } catch (e) {
          const random = Math.floor(Math.random() * 101);
          return interaction.editReply({
            content: `💞 **${user1.username}** ile **${user2.username}** arasındaki aşk uyumu: **%${random}**`
          });
        }
      }
    },
    {
      name: 'teklif',
      description: 'Belirttiğiniz kullanıcıya çıkma teklifi edersiniz.',
      options: [
        { name: 'kullanici', description: 'Teklif edilecek kişi', type: 'user', require: true }
      ],
      async execute(client, interaction) {
        const target = interaction.options.getUser('kullanici');
        if (target.id === interaction.user.id) return interaction.reply({ content: "Kendinize çıkma teklifi edemezsiniz!", ephemeral: true });

        const embed = new MessageEmbed()
          .setTitle("💍 Çıkma Teklifi!")
          .setColor("RED")
          .setDescription(`Hey ${target}! ${interaction.user} seninle çıkmak istiyor.\nNe dersin?`)
          .setThumbnail(target.displayAvatarURL())
          .setFooter({ text: "Karar senin!" });

        return interaction.reply({ content: `${target}`, embeds: [embed] });
      }
    }
  ]
};
