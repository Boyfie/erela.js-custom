"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = require("./Queue");
/**
 * The Player class.
 */
class Player {
    /**
     * Creates an instance of Player.
     * @param {ErelaClient} erela - The Erela client.
     * @param {Node} node - The Erela Node.
     * @param {IPlayerOptions} options - The player options.
     * @param {any} extra - Extra data to pass when extending for custom classes.
     */
    constructor(erela, node, options, extra) {
        /**
         * The players equalizer bands.
         */
        this.bands = [...new Array(14)].map((__, i) => JSON.parse(`{"band": ${i}, "gain": 0.0}`));
        /**
         * Whether the player is playing.
         */
        this.playing = false;
        /**
         * The players current position in the track.
         */
        this.position = 0;
        /**
         * Whether the player is repeating the current track.
         */
        this.trackRepeat = false;
        /**
         * Whether the player is repeating the queue.
         */
        this.queueRepeat = false;
        this.erela = erela;
        this.node = node;
        this.options = options;
        this.guild = options.guild;
        this.textChannel = options.textChannel;
        this.voiceChannel = options.voiceChannel;
        this.queue = new Queue_1.Queue(erela);
        this.volume = options.volume || 100;
    }
    /**
     * Changes the player's voice channel.
     * @param {*} channel - The new voice channel to join.
     * @memberof Player
     */
    setVoiceChannel(channel) {
        if (this.erela.library) {
            if (typeof channel === "undefined") {
                throw new RangeError("Player#setVoiceChannel(channel: any) Channel must be a voice channel.");
            }
            const guild = this.erela.library.findGuild(this.erela.client, this.guild.id || this.guild);
            channel = this.erela.library.findGuildChannel(guild, channel.id || channel);
            if (!channel) {
                // tslint:disable-next-line: max-line-length
                throw new RangeError("Player#setVoiceChannel(channel: any) Cannot bind to a channel not in this guild.");
            }
        }
        this.voiceChannel = this.voiceChannel.id ? channel : channel.id;
        this.erela.sendWS({
            op: 4,
            d: {
                guild_id: this.guild.id || this.guild,
                channel_id: this.voiceChannel.id || this.voiceChannel,
                self_mute: this.options.selfMute || false,
                self_deaf: this.options.selfDeaf || false,
            },
        });
    }
    /**
     * Changes the player's text channel.
     * @param {*} channel - The new text channel to send messages in.
     * @memberof Player
     */
    setTextChannel(channel) {
        if (this.erela.library) {
            if (typeof channel === "undefined") {
                throw new RangeError("Player#setTextChannel(channel: any) Channel must be a text channel.");
            }
            const guild = this.erela.library.findGuild(this.erela.client, this.guild.id || this.guild);
            channel = this.erela.library.findGuildChannel(guild, channel.id || channel);
            if (!channel) {
                throw new RangeError("Player#setTextChannel(channel: any) Cannot bind to a channel not in this guild.");
            }
        }
        this.textChannel = this.textChannel.id ? channel : channel.id;
    }
    /**
     * Plays the next track in the queue.
     */
    play() {
        if (!this.queue[0]) {
            throw new RangeError("Player#play() No tracks in the queue.");
        }
        this.playing = true;
        this.node.send({
            op: "play",
            guildId: this.guild.id || this.guild,
            track: this.queue[0].track,
            volume: this.volume,
        });
        this.erela.emit("trackStart", this, this.queue[0]);
    }
    /**
     * Sets the players volume.
     * @param {number} volume - The volume to set.
     */
    setVolume(volume) {
        if (isNaN(volume)) {
            throw new RangeError("Player#setVolume(volume: number) Volume must be a number");
        }
        if (volume < 0 || volume > 1000) {
            throw new RangeError("Player#setVolume(volume: number) Volume can not be lower than 0 or higher than 1000, must be or be between 0 and 1000.");
        }
        this.volume = volume;
        this.node.send({
            op: "volume",
            guildId: this.guild.id || this.guild,
            volume,
        });
    }
    /**
     * Sets the players equalizer. Pass a empty array to reset the bands.
     * @param {Array<EqualizerBand>} bands - The array of bands to set.
     * @example
     * player.setEQ([
     *      { band: 0, gain: 0.15 },
     *      { band: 1, gain: 0.15 },
     *      { band: 2, gain: 0.15 }
     * ]);
     */
    setEQ(bands) {
        if (!Array.isArray(bands)) {
            throw new RangeError("Player#setEQ(bands: IEqualizerBand[]) Bands must be a array of bands.");
        }
        if (bands.length === 0) {
            this.bands.map((v, i) => this.bands[i].gain = 0.0);
        }
        else {
            bands.forEach(({ band, gain }) => this.bands[band].gain = gain);
        }
        this.node.send({
            op: "equalizer",
            guildId: this.guild.id || this.guild,
            bands: this.bands.map((band) => band),
        });
    }
    
    setFilter(op, body = {}) {
        this.node.send(Object.assign({ op: op, guildId: this.guild.id || this.guild }, body));
    }
    /**
     * Sets the track repeat.
     * @param {boolean} repeat - If track repeat should be enabled.
     */
    setTrackRepeat(repeat) {
        if (typeof repeat !== "boolean") {
            throw new RangeError("Player#setTrackRepeat(repeat: boolean) Repeat can only be \"true\" or \"false\".");
        }
        if (repeat) {
            this.trackRepeat = true;
            this.queueRepeat = false;
        }
        else {
            this.trackRepeat = false;
            this.queueRepeat = false;
        }
    }
    /**
     * Sets the queue repeat.
     * @param {boolean} repeat - If queue repeat should be enabled.
     */
    setQueueRepeat(repeat) {
        if (typeof repeat !== "boolean") {
            throw new RangeError("Player#setQueueRepeat(repeat: boolean) Repeat can only be \"true\" or \"false\".");
        }
        if (repeat) {
            this.trackRepeat = false;
            this.queueRepeat = true;
        }
        else {
            this.trackRepeat = false;
            this.queueRepeat = false;
        }
    }
    /**
     * Stops the current track.
     */
    stop() {
        this.node.send({
            op: "stop",
            guildId: this.guild.id || this.guild,
        });
    }
    /**
     * Pauses the current track.
     * @param {boolean} pause - Whether to pause the current track.
     */
    pause(pause) {
        if (typeof pause !== "boolean") {
            throw new RangeError("Player#pause(pause: boolean) Pause can only be \"true\" or \"false\".");
        }
        this.playing = !pause;
        this.node.send({
            op: "pause",
            guildId: this.guild.id || this.guild,
            pause,
        });
    }
    /**
     * Seeks to the position in the current track.
     * @param {boolean} pause - Whether to pause the current track.
     */
    seek(position) {
        if (!this.queue[0]) {
            throw new RangeError("Player#seek(position: number) Can only seek when theres a track in the queue.");
        }
        if (isNaN(position)) {
            throw new RangeError("Player#seek(position: number) Position must be a number.");
        }
        if (position < 0 || position > this.queue[0].duration) {
            throw new RangeError(`Player#seek(position: number) Position can not be smaller than 0 or bigger than ${this.queue[0].duration}.`);
        }
        this.position = position;
        this.node.send({
            op: "seek",
            guildId: this.guild.id || this.guild,
            position,
        });
    }
}
exports.Player = Player;
