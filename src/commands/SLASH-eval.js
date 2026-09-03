const Discord = require("discord.js");

module.exports = {
    slash: true, 
    enable: true,
	  name: ["eval"],
    description: 'eval kodu', 
    option: [
        {  
            name: 'kod', 
            description: 'çalıştırılacak kod', 
            type: 'string', 
            require: true 
        } 
    ],

	async execute(client, interaction) { 
        const code = interaction.options.getString("kod")

        if (interaction.user.id !== "606572330457497641") return interaction.reply("`<a:armors_iptal:990609550153486357> Sahibim sen değilsin dostum!");
        try {
          var evaled = eval(code);
          if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
          return interaction.reply({ content: "```js\n" + clean(evaled) + "```"});
        } catch (err) { 
          interaction.reply(`\`\`js\nHATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
        function clean(text) {
          if (typeof text === "string")
            return text
              .replace(/`/g, "`" + String.fromCharCode(8203)) 
              .replace(/@/g, "@" + String.fromCharCode(8203));
          else return text;
        } 

	},
};