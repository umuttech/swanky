// Bu dosya botun slash komutlarını eventlerini ve message komutlarını yüklemek içindir.

const commands = [];
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require('@discordjs/rest');
const { Collection } = require("discord.js");
const { Routes } = require('discord-api-types/v9');
const eventsPath = path.join(__dirname, "../events");
const settings = require("./settings.json");
const token = process.env.TOKEN || settings.token;
const botid = process.env.BOT_ID || settings.botid;
const commandsPath = path.join(__dirname, "../commands");
const { SlashCommandBuilder } = require('@discordjs/builders');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

function addOptionTo(builder, opt) {
  const isRequired = !!(opt.require || opt.required);
  const addChoicesIfAny = (optionBuilder) => {
    if (opt.choices && Array.isArray(opt.choices) && opt.choices.length > 0) {
      optionBuilder.addChoices(...opt.choices);
    }
    return optionBuilder;
  };

  switch (opt.type) {
    case 'string':
      builder.addStringOption(o => addChoicesIfAny(o.setName(opt.name).setDescription(opt.description).setRequired(isRequired)));
      break;
    case 'integer':
      builder.addIntegerOption(o => addChoicesIfAny(o.setName(opt.name).setDescription(opt.description).setRequired(isRequired)));
      break;
    case 'number':
      builder.addNumberOption(o => addChoicesIfAny(o.setName(opt.name).setDescription(opt.description).setRequired(isRequired)));
      break;
    case 'boolean':
      builder.addBooleanOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(isRequired));
      break;
    case 'user':
      builder.addUserOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(isRequired));
      break;
    case 'channel':
      builder.addChannelOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(isRequired));
      break;
    case 'role':
      builder.addRoleOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(isRequired));
      break;
    case 'mentionable':
      builder.addMentionableOption(o => o.setName(opt.name).setDescription(opt.description).setRequired(isRequired));
      break;
  }
}

module.exports = (client) => {
  client.commands = new Collection();
  client.slashcommands = new Collection();

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command.slash) {
      const primaryName = Array.isArray(command.name) ? command.name[0] : command.name;
      client.slashcommands.set(primaryName, command);

      const slashCommand = new SlashCommandBuilder()
        .setName(primaryName)
        .setDescription(command.description || 'Komut açıklaması bulunmuyor.');

      // Standart Seçenekler (Options)
      const options = command.option || command.options;
      if (options && Array.isArray(options)) {
        for (const opt of options) {
          addOptionTo(slashCommand, opt);
        }
      }

      // Alt Komutlar (Subcommands)
      if (command.subcommands && Array.isArray(command.subcommands)) {
        for (const sub of command.subcommands) {
          slashCommand.addSubcommand(subBuilder => {
            subBuilder.setName(sub.name).setDescription(sub.description || 'Alt komut');
            const subOptions = sub.option || sub.options;
            if (subOptions && Array.isArray(subOptions)) {
              for (const opt of subOptions) {
                addOptionTo(subBuilder, opt);
              }
            }
            return subBuilder;
          });
        }
      }

      commands.push(slashCommand);
    }

    if (!command.slash && command.name) {
      const names = Array.isArray(command.name) ? command.name : [command.name];
      for (const n of names) {
        client.commands.set(n, command);
      }
    }
  }

  console.log(`[Yükleyici] ${client.slashcommands.size} Slash Komut ve ${client.commands.size} Prefix Komut yüklendi.`);
};

const rest = new REST({ version: '9' }).setToken(token);

setTimeout(async () => {
  if (commands.length > 0) {
    console.log(`[Slash Kayıt] ${commands.length} komut Discord API'ye kaydediliyor...`);
    rest.put(Routes.applicationCommands(botid), { body: commands })
      .then(() => console.log(`[Slash Kayıt] ${commands.length} komut başarıyla Discord'a kaydedildi!`))
      .catch(err => console.error('[Slash Kayıt Hatası]:', err));
  }
}, 500);

