##THIS ERELA.JS USE FOR CUSTOM LAVALINK

Fork from here: [Thank for erela.js](https://github.com/MenuDocs/erela.js)

`
npm i github:Adivise/erela.js-custom
`
Look the package:
```json
{
  "name": "nanospacex",
  "version": "3.0.0",
  "description": "✈ Join Discord: https://discord.gg/SNG3dh3MbR 👌",
  "main": "index.js",
  "dependencies": {
    "chalk": "^4.1.0",
    "common-tags": "^1.8.0",
    "delay": "^4.4.0",
    "discord.js": "^13.3.1",
    "erela.js": "github:Adivise/erela.js-custom",
    "figlet": "^1.5.0",
    "node-fetch": "^2.6.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "nanotect",
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Adivise/musicbot-lavalink.git"
  },
  "bugs": {
    "url": "https://github.com/Adivise/musicbot-lavalink/issues"
  },
  "homepage": "https://github.com/Adivise/musicbot-lavalink#readme"
}
```

Example:
```js
const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { vaporwave } = require('../../config/filter');

module.exports = { 
    config: {
        name: "vaporwave",
        description: "Turning on vaporwave filter",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },

    run: async (client, message) => {
        const msg = await message.channel.send("Turning on **Vaporwave**. This may take a few seconds...");

        const player = client.manager.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.setFilter('filters', vaporwave);

        const vaporwaved = new MessageEmbed()
            .setAuthor("Turned on: Vaporwave", 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [vaporwaved] });
            console.log(chalk.magenta(`[COMMAND] Vaporwave used by ${message.author.tag} from ${message.guild.name}`));
   }
};
```

Filter:
```js
module.exports = {
    'reset': {
    },
    'bass': {
        'equalizer': [
            { 'band': 0, 'gain': 0.6 },
            { 'band': 1, 'gain': 0.67 },
            { 'band': 2, 'gain': 0.67 },
            { 'band': 3, 'gain': 0 },
            { 'band': 4, 'gain': -0.5 },
            { 'band': 5, 'gain': 0.15 },
            { 'band': 6, 'gain': -0.45 },
            { 'band': 7, 'gain': 0.23 },
            { 'band': 8, 'gain': 0.35 },
            { 'band': 9, 'gain': 0.45 },
            { 'band': 10, 'gain': 0.55 },
            { 'band': 11, 'gain': 0.6 },
            { 'band': 12, 'gain': 0.55 },
            { 'band': 13, 'gain': 0 },
        ],
    },
    'pop': {
        'equalizer': [
            { 'band': 0, 'gain': 0.65 },
            { 'band': 1, 'gain': 0.45 },
            { 'band': 2, 'gain': -0.45 },
            { 'band': 3, 'gain': -0.65 },
            { 'band': 4, 'gain': -0.35 },
            { 'band': 5, 'gain': 0.45 },
            { 'band': 6, 'gain': 0.55 },
            { 'band': 7, 'gain': 0.6 },
            { 'band': 8, 'gain': 0.6 },
            { 'band': 9, 'gain': 0.6 },
            { 'band': 10, 'gain': 0 },
            { 'band': 11, 'gain': 0 },
            { 'band': 12, 'gain': 0 },
            { 'band': 13, 'gain': 0 },
        ],
    },
    'soft': {
        'equalizer': [
            { 'band': 0, 'gain': 0 },
            { 'band': 1, 'gain': 0 },
            { 'band': 2, 'gain': 0 },
            { 'band': 3, 'gain': 0 },
            { 'band': 4, 'gain': 0 },
            { 'band': 5, 'gain': 0 },
            { 'band': 6, 'gain': 0 },
            { 'band': 7, 'gain': 0 },
            { 'band': 8, 'gain': -0.25 },
            { 'band': 9, 'gain': -0.25 },
            { 'band': 10, 'gain': -0.25 },
            { 'band': 11, 'gain': -0.25 },
            { 'band': 12, 'gain': -0.25 },
            { 'band': 13, 'gain': -0.25 },
        ],
    },
    'treblebass': {
        'equalizer': [
            { 'band': 0, 'gain': 0.6 },
            { 'band': 1, 'gain': 0.67 },
            { 'band': 2, 'gain': 0.67 },
            { 'band': 3, 'gain': 0 },
            { 'band': 4, 'gain': -0.5 },
            { 'band': 5, 'gain': 0.15 },
            { 'band': 6, 'gain': -0.45 },
            { 'band': 7, 'gain': 0.23 },
            { 'band': 8, 'gain': 0.35 },
            { 'band': 9, 'gain': 0.45 },
            { 'band': 10, 'gain': 0.55 },
            { 'band': 11, 'gain': 0.6 },
            { 'band': 12, 'gain': 0.55 },
            { 'band': 13, 'gain': 0 },
        ],
    },
    'superbass': {
        'equalizer': [
            { 'band': 0, 'gain': 0.2 },
            { 'band': 1, 'gain': 0.3 },
            { 'band': 2, 'gain': 0 },
            { 'band': 3, 'gain': 0.8 },
            { 'band': 4, 'gain': 0 },
            { 'band': 5, 'gain': 0.5 },
            { 'band': 6, 'gain': 0 },
            { 'band': 7, 'gain': -0.5 },
            { 'band': 8, 'gain': 0 },
            { 'band': 9, 'gain': 0 },
            { 'band': 10, 'gain': 0 },
            { 'band': 11, 'gain': 0 },
            { 'band': 12, 'gain': 0 },
            { 'band': 13, 'gain': 0 },
        ],
    },
    'nightcore': {
        equalizer: [
            { band: 1, gain: 0.3 },
            { band: 0, gain: 0.3 },
        ],
        timescale: { pitch: 1.2 },
        tremolo: { depth: 0.3, frequency: 14 },
    },
    'vaporwave': {
        equalizer: [
            { band: 1, gain: 0.3 },
            { band: 0, gain: 0.3 },
        ],
        timescale: { pitch: 0.5 },
        tremolo: { depth: 0.3, frequency: 14 },
    },
};
```
