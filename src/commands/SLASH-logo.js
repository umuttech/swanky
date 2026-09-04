const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

const LOGO_STYLES = {
  alev: {
    name: "Alev",
    url: (t) => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=flame-logo&text=${t}`,
    footer: "Alevli Logo Oluşturuldu"
  },
  alev2: {
    name: "Alev 2",
    url: (t) => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=fire-logo&text=${t}`,
    footer: "Alevli Logo 2 Oluşturuldu"
  },
  altin: {
    name: "Altın",
    url: (t) => `https://habbofont.net/font/steampunk/${t}.gif`,
    footer: "Altın Logo Oluşturuldu"
  },
  anime: {
    name: "Anime",
    url: (t) => `https://habbofont.net/font/battlebanzai/${t}.gif`,
    footer: "Anime Logo Oluşturuldu"
  },
  banner: {
    name: "Banner",
    url: (t) => `https://dummyimage.com/2000x500/33363c/ffffff&text=${t}`,
    footer: "Banner Oluşturuldu"
  },
  basit: {
    name: "Basit",
    url: (t) => `https://dummyimage.com/600x600/eb0949/000000&text=${t}`,
    footer: "Basit Logo Oluşturuldu"
  },
  buz: {
    name: "Buz",
    url: (t) => `https://habbofont.net/font/arctic/${t}.gif`,
    footer: "Buz Logo Oluşturuldu"
  },
  dinamik: {
    name: "Dinamik",
    url: (t) => `https://dynamic.brandcrowd.com/asset/logo/f802ad87-f5ae-491f-9a02-89ee701b588f/logo?v=4&text=${t}`,
    footer: "Dinamik Logo Oluşturuldu"
  },
  discord: {
    name: "Discord",
    url: (t) => `https://flamingtext.com/net-fu/proxy_form.cgi?script=adidas-logo&fontname=ethnocentric&text=${t}&script=adidas-logo&text=Discord&fontname=ethnocentric&fillTextColor=%236d81e7&fillOutlineColor=%23fbfaf9&shadowType=0&backgroundRadio=0&imageoutput=true`,
    footer: "Discord Logo Oluşturuldu"
  },
  elmas: {
    name: "Elmas",
    url: (t) => `https://habbofont.net/font/palooza_blue/${t}.gif`,
    footer: "Elmas Logo Oluşturuldu"
  },
  google: {
    name: "Google",
    url: (t) => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=electric&text=${t}`,
    footer: "Google Logo Oluşturuldu"
  },
  grafiti: {
    name: "Grafiti",
    url: (t) => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=graffiti-logo&text=${t}`,
    footer: "Grafiti Logo Oluşturuldu"
  },
  yesil: {
    name: "Yeşil",
    url: (t) => `https://dynamic.brandcrowd.com/asset/logo/7f0254b2-49ae-4819-9107-47728665a65f/logo?v=4&text=${t}`,
    footer: "Yeşil Logo Oluşturuldu"
  },
  gokkusagi: {
    name: "Gökkuşağı",
    url: (t) => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=orlando-logo&text=${t}`,
    footer: "Gökkuşağı Logo Oluşturuldu"
  },
  hobbo: {
    name: "Hobbo",
    url: (t) => `https://habbofont.net/font/habbo_clicker/${t}.gif`,
    footer: "Hobbo Logo Oluşturuldu"
  },
  kalin: {
    name: "Kalın",
    url: (t) => `https://habbofont.net/font/shalimar_big/${t}.gif`,
    footer: "Kalın Logo Oluşturuldu"
  },
  kurdele: {
    name: "Kurdele",
    url: (t) => `https://habbofont.net/font/habboclub_complete/${t}.gif`,
    footer: "Kurdele Logo Oluşturuldu"
  },
  kirmizi: {
    name: "Kırmızı",
    url: (t) => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=booking-logo&text=${t}`,
    footer: "Kırmızı Logo Oluşturuldu"
  },
  muzik: {
    name: "Müzik",
    url: (t) => `https://bcassetcdn.com/asset/logo/545fa973-da1e-428a-bf78-f9f8b0717cdb/logo?v=4&text=${t}`,
    footer: "Müzik Logo Oluşturuldu"
  },
  neonmavi: {
    name: "Neon Mavi",
    url: (t) => `https://habbofont.net/font/neon_blue/${t}.gif`,
    footer: "Neon Mavi Logo Oluşturuldu"
  },
  odun: {
    name: "Odun",
    url: (t) => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=wood&text=${t}`,
    footer: "Odun Logo Oluşturuldu"
  },
  sari: {
    name: "Sarı",
    url: (t) => `https://habbofont.net/font/palooza/${t}.gif`,
    footer: "Sarı Logo Oluşturuldu"
  }
};

const choices = Object.keys(LOGO_STYLES).map(k => ({
  name: LOGO_STYLES[k].name,
  value: k
}));

module.exports = {
  slash: true,
  name: ['logo'],
  description: 'Yazdığınız mesajı seçtiğiniz stilde logoya dönüştürür.',
  option: [
    {
      name: 'stil',
      description: 'Oluşturulacak logo stili',
      type: 'string',
      require: true,
      choices: choices
    },
    {
      name: 'yazi',
      description: 'Logoda yazacak metin',
      type: 'string',
      require: true
    }
  ],
  async execute(client, interaction) {
    const stil = interaction.options.getString('stil');
    const yazi = interaction.options.getString('yazi');
    const encoded = encodeURIComponent(yazi);

    const styleData = LOGO_STYLES[stil] || LOGO_STYLES.alev;
    const imgUrl = styleData.url(encoded);

    const embed = new MessageEmbed()
      .setTitle(`SwankyBot - ${styleData.name} Logo`)
      .setColor("RANDOM")
      .setImage(imgUrl)
      .setFooter({ text: `${styleData.footer} • İsteyen: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    const button = new MessageButton()
      .setLabel('Görsel Bağlantısı')
      .setStyle('LINK')
      .setURL(imgUrl);

    const row = new MessageActionRow().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  }
};
