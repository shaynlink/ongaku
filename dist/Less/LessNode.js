'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@discordjs/collection");
const Song_1 = require("./Song");
const Player_1 = require("./Player");
const Util_1 = require("../util/Util");
const ytdl = require("ytdl-core");
;
/**
 * Class Node
 */
class LessNode {
    /**
     * @param {Client} client - Ongaku Client
     * @param {string} uuid - UUID
     */
    constructor(client, uuid) {
        /**
         * Ongaku Client
         * @type {Client}
         */
        this.client = client;
        /**
         * LessNode UUID
         * @type {string}
         */
        this.uuid = uuid;
        /**
         * Song collection
         * @type {Collection<string, Song>}
         */
        this.queue = new collection_1.default();
        /**
         * Hook ID
         * @type {string}
         */
        this.hookID = 'hook_' + uuid;
        /**
         * LessNode player
         * @type {?Player}
         */
        this.player;
    }
    ;
    /**
     * Return hook url
     * @return {string}
     */
    get hookURL() {
        return `http://${this.client.options.host}:${this.client.options.port}/nodes/${this.uuid}/hook`;
    }
    ;
    /**
     * Add song in queue
     * @param {stream.Readable} stream
     * @param {SongData} data - Sond data
     * @return {Song}
     * @example
     * addSong(ytdl('youtube url'), {
     *  url: 'same url',
     *  service: 'youtube',
     * })
     */
    addSong(stream, data) {
        const song = new Song_1.default(this, Util_1.default.createUUID(), data, stream);
        this.queue.set(song.uuid, song);
        return song;
    }
    ;
    /**
     * Add song in queue by url
     * @param {string} url - Video/Song url
     * @param {'youtube'} service - Service
     * @param {any} options - Options
     * @return {Song}
     */
    addSongByURL(url, service = 'youtube', options) {
        if (service == 'youtube') {
            const stream = ytdl(url, options);
            const song = new Song_1.default(this, Util_1.default.createUUID(), {
                url,
                service,
            }, stream);
            this.queue.set(song.uuid, song);
            return song;
        }
        else
            return new Error('Service not supported');
    }
    ;
    /**
     * Delete LessNode
     * @return {void}
     */
    delete() {
        this.client.nodes.delete(this.uuid);
    }
    ;
    /**
     * Return LessNode object
     * @return {LessNodeData}
     */
    toJSON() {
        return {
            uuid: this.uuid,
            queue: this.queue.array().map((song) => song.toJSON()),
            hookID: this.hookID,
        };
    }
    ;
    /**
     * Create player (only for API)
     * @param {express.response} res - API response
     * @return {Player}
     * @example
     * createPlayer(res);
     */
    createPlayer(res) {
        return this.player = new Player_1.default(this, res);
    }
    ;
}
;
exports.default = LessNode;
