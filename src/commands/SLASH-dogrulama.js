const { MessageEmbed } = require("discord.js");
const db = require("croxydb");

module.exports = {
  slash: true,
  name: ['dogrulama'],
  description: 'Resimli captcha/güvenlik doğrulama sistemi.',
  subcommands: [
    {
      name: 'kur',
      description: 'Resimli doğrulama sistemini kurarsınız.',
      options: [
        { name: 'kanal', description: 'Doğrulama mesajının gönderileceği kanal', type: 'channel', require: true },
        { name: 'rol', description: 'Doğrulama tamamlandığında verilecek üye rolü', type: 'role', require: true }
      ],
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const kanal = interaction.options.getChannel('kanal');
        const rol = interaction.options.getRole('rol');

        db.set(`kanal_${interaction.guild.id}`, kanal.id);
        db.set(`role_${interaction.guild.id}`, rol.id);

        const embed = new MessageEmbed()
          .setTitle("✅ Doğrulama Sistemi Kuruldu")
          .setColor("GREEN")
          .setDescription("Sunucuya yeni katılan kullanıcılar belirtilen kanalda resimli doğrulamayı tamamlayınca belirlenen rolü alacaktır.")
          .addField("Doğrulama Kanalı", `<#${kanal.id}>`, true)
          .addField("Verilecek Rol", `<@&${rol.id}>`, true)
          .setFooter({ text: "Sıfırlamak için: /dogrulama sifirla" });

        return interaction.reply({ embeds: [embed] });
      }
    },
    {
      name: 'sifirla',
      description: 'Doğrulama sistemi ayarlarını sıfırlar.',
      async execute(client, interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısınız.", ephemeral: true });
        }

        db.delete(`role_${interaction.guild.id}`);
        db.delete(`kanal_${interaction.guild.id}`);

        return interaction.reply({ content: "🗑️ Resimli doğrulama sistemi başarıyla sıfırlandı." });
      }
    }
  ]
};
