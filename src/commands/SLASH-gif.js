const { MessageEmbed } = require('discord.js');

const GIFS = {
  "animal": [
    "https://cdn.discordapp.com/attachments/733640065200160768/737280791993779206/tenor_3.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737280895995740210/tenor_7.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737280900022140938/tenor_2.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737280920800722984/tenor_9.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737280921689915411/tenor_10.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737280924563275776/tenor.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737280929311096842/tenor_5.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737280944016457748/tenor_1.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737280945195057193/tenor_6.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737281583412805712/tenor_8.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737281572826382336/tenor_4.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282276320084118/tenor_2.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282249422143488/tenor_3.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282243113910292/tenor_4.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282207579635722/tenor.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282195185467473/tenor_5.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282604176506910/tenor.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282625747681410/tenor_1.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282660250157122/tenor_4.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282929633525851/tenor_11.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282757188911174/tenor_7.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282947119579216/tenor_9.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282750385487932/tenor_5.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282940760883210/tenor_10.gif",
    "https://cdn.discordapp.com/attachments/733640065200160768/737282991348252683/tenor_13.gif"
  ],
  "anime": [
    "https://cdn.discordapp.com/attachments/697505578972348436/737311070364106844/image0.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/737296516774887505/bc500ed43e3593fcb9b10331ae644586.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/737286213723226182/a_4a728888f25331995f9c61df26ffffdb.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/737113186280538152/image0.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/737052176106520687/image1.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/737078026923409439/9190dc1cb39fa98fd9e12bb135aac545.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/737052175754199070/image0.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/736898906633273364/64.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/737004415197904916/a_3bfd1dff4faab26f7a612a34cb2eb049.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/735948576739426385/1.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/736928294414450718/ROF8OQvDmxytW.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/735948476520857650/5.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/736757429450309673/image0.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/735948187487174747/48.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/736588684270239774/ezgif-6-e83305d159d6.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/735948178855034955/anime_24.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/736388428761137193/14Nqi9PD8H.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/735948036202561677/previewfile_1877013475.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/736388213421244477/Yblikw9Rj1.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/735947565966688306/a_d6e522c9e10db64260eccb3c3455733c.gif",
    "https://cdn.discordapp.com/attachments/697505578972348436/736388155229339708/zyJgqrsAUg.gif",
    "https://cdn.discordapp.com/attachments/694694884459937862/735621470969135217/sasuke_al_moj.gif"
  ],
  "baby": [
    "https://cdn.discordapp.com/attachments/699339066029768796/736983333254332456/1.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/737156529278550046/10.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736983248021749775/6.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736983242271359067/5.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736983236260921455/8.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736983217856315483/3.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736983211619516447/2-2.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736978634031759400/40.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736978111043731476/a_204c3f0f05cbef57c6297ee3f230f22a.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736978069038039050/f5a91c2c25a6a082f8ecafc826c13760.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736977973688795237/2.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736977934375583926/a_bf8ac566a856ad839d310e919ba15791.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736977911831330886/image0-7.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736977867811979324/a_c21ae57fdd3ad6ac99cd038b6a5aa1e4.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/736148143678291968/15.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/735864299024810155/20200723_142037.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/735910966792945764/image0.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/735910962762350642/image0.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/735194170230308904/a_0690a3032ce9908e230d7f71dd9a6988_1.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/734965436663464076/a_4f5d107e5160642113337218f63a6441.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/734965350357008384/a_8f2bce5f3a3312e7e95236a39ea70efe.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/734965015739629599/image0-6.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/732175141567725639/image0.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/730498782265081876/bab3.gif",
    "https://cdn.discordapp.com/attachments/699339066029768796/730499512602329198/14.gif"
  ],
  "couple": [
    "https://cdn.discordapp.com/attachments/694694675679936585/737306643355664384/image02.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737306628528930816/a_1b0b9e83a11f0e8280c5409e85dc6ecf.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737306606068564108/image0_7.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737306593485651979/image01.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737306585470074890/20.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737305042096488478/image03.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737305094038749224/a_788eee9ad77c81e7406d1c06c75de1a1.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737305150607327255/larissa56.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737305158668517486/image0.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737305302352789554/image0-4.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737306359330111548/gif_dc_dc_dc.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/736981583474589777/a_48d8e6c6b3ab9bdc3d27e9dc7bfbee53.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737305354270015628/a_b77c51a4aa5bc3460d375f415dec1507.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737304729444679730/a_73dea0b44c5e1f57bdbbfc036b7cf3dc.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737304802501066862/image0-2.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737109543263404132/image0.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737066393694109718/a_d8f145cc1f4ad05bf97a118f64d673ff.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737066415877652490/image0_8.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/737013297336942603/a_37397898637eca6eae7458899b12826c.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/736898861913604156/image0-10.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/736898644808040538/a_e4931ce8b4c41a2f4bb15c51dfd0b898.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/736898505427386378/f6bd4fa420a9d8ce58c6519a90bc8bc0.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/736898257925570600/a_1e816625dd242018b144b924043a7933.gif",
    "https://cdn.discordapp.com/attachments/694694675679936585/736897942342074428/a_8634244b88f7dc8eebbf416640489ef2.gif",
    "https://cdn.discordapp.com/avatars/606572330457497641/a_c306beb47eed07b0a2babbe8ab5df6c6.gif"
  ],
  "man": [
    "https://cdn.discordapp.com/attachments/746824654840135761/1011351450527469669/e799289dfa8207ad79e4aefc456f34db.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1010994301951541248/9814F00C-199A-4453-BDDB-8C77C0F4B24A.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1010992535834992850/258DCC95-26C2-4658-AFEF-B0B4FD784B9B.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1010711225111433318/Man_PP_Gif_85.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1010711224868159608/Man_PP_Gif_88.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1010660785392996423/a_68741017edf1f607feda61aa9a1d644d.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1010649345965695087/Man_PP_Gif_95.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1010649344829042768/Man_PP_Gif_92.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1010649282870784010/Man_PP_Gif_89.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1005865421032931449/hit_gif_43.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1005865035417002004/hit_gif_6.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1005865033781231617/hit_gif_41.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1005864685146480793/hit_gif_42.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1005448184732078091/gif_136.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1005134909821702185/damkdwa.gif",
    "https://cdn.discordapp.com/attachments/746824654840135761/1005134910174007416/a_553c763897b352cafffccfa9317a6d63-1.gif"
  ],
  "woman": [
    "https://cdn.discordapp.com/attachments/694694493525377035/737302021295833109/GIF-200727_113742.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737302739444301824/wqeqw.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737303378173886554/a_14254a7b0842b2a7f32a19cb34028da4.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737302765520551946/a_dfda87717edc3a1ee1057aec5304f082.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737310262906060810/image0.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737310178180989009/image0.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737310007929864252/image0.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737300958031380549/a_e052cc1eb09b212fa6b4c3644450b154.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737301552750002226/rosiegif4.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737301660455534642/GIF.6.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737301813912666145/gif_342.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737301817615974471/GIF.5.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737301870971846687/gif_346.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737301916379381790/gif_335.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737021018333249546/Lorie10.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737021142547693618/a_3a35e998e21a471ca9999b2e78051d53.gif",
    "https://cdn.discordapp.com/attachments/694694493525377035/737036899612360774/a_0edcde786dca1aa7cb3caf12af732bc5.gif"
  ]
};

const CATEGORY_NAMES = {
  animal: 'Hayvan',
  anime: 'Anime',
  baby: 'Bebek',
  couple: 'Çift (Couple)',
  man: 'Erkek',
  woman: 'Kadın'
};

module.exports = {
  slash: true,
  name: ['gif'],
  description: 'Seçtiğiniz kategoriden rastgele bir GIF gönderir.',
  option: [
    {
      name: 'kategori',
      description: 'Hangi kategoriden GIF istiyorsunuz?',
      type: 'string',
      require: true,
      choices: [
        { name: 'Anime', value: 'anime' },
        { name: 'Hayvan (Animal)', value: 'animal' },
        { name: 'Bebek (Baby)', value: 'baby' },
        { name: 'Çift (Couple)', value: 'couple' },
        { name: 'Erkek (Man)', value: 'man' },
        { name: 'Kadın (Woman)', value: 'woman' }
      ]
    },
    {
      name: 'kullanici',
      description: 'GIF göndermek istediğiniz kullanıcı (opsiyonel)',
      type: 'user',
      require: false
    }
  ],
  async execute(client, interaction) {
    const kategori = interaction.options.getString('kategori');
    const hedefKullanici = interaction.options.getUser('kullanici');
    const list = GIFS[kategori] || GIFS.anime;
    const randomGif = list[Math.floor(Math.random() * list.length)];

    const title = hedefKullanici
      ? `${interaction.user.username}, ${hedefKullanici.username} için bir ${CATEGORY_NAMES[kategori] || kategori} GIF gönderdi!`
      : `SwankyBot - ${CATEGORY_NAMES[kategori] || kategori} GIF`;

    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor('RANDOM')
      .setImage(randomGif)
      .setFooter({ text: `İsteyen: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
