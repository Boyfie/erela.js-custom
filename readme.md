**THIS IS OLD ERELA.JS FOR CUSTOMLAVALINK **

	**NOTE: EDIT FOR CUSTOMFILTERS**

- EXAMPLE FILTER

```js
const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { vaporwave } = require('../../config/filter')

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

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        player.setFilter('filters', vaporwave);

        const vaporwaved = new MessageEmbed()
            .setAuthor("Turned on: Vaporwave", 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(5000);
        msg.edit('', vaporwaved);
            console.log(chalk.magenta(`  [Command]: Vaporwave used by ${message.author.tag} from ${message.guild.name}`));
   }
};
```
- CONFIG FILTER

```js
module.exports = {
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
