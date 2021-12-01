## THIS ERELA.JS USE FOR CUSTOM LAVALINK

- FORK FROM: [Thank for erela.js](https://github.com/MenuDocs/erela.js)

- USE FOR: [CLICK HERE](https://github.com/melike2d/lavalink)

`
npm i github:Adivise/erela.js-custom
`

## Package.json:

```json
{
  "main": "index.js",
  "dependencies": {
    "discord.js": "^13.3.1",
    "erela.js": "github:Adivise/erela.js-custom",
}
```

## Example NightCore:
```js
player.setFilter('filters', {
        equalizer: [
            { band: 1, gain: 0.3 },
            { band: 0, gain: 0.3 },
        ],
        timescale: { pitch: 1.2 },
        tremolo: { depth: 0.3, frequency: 14 },
    },
);
```
