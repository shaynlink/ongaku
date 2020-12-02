'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl_core_1 = require("ytdl-core");
;
;
/**
 * class Song
 */
class Song {
    /**
     * @param {Node} node - Node
     * @param {String} uuid - UUID
     * @param {SongData} data - Song data
     * @param {stream.Readable} stream - Stream readable
     */
    constructor(node, uuid, data, stream) {
        /**
         * Node
         * @type {Node}
         */
        this.node = node;
        /**
         * Ongaku client
         * @type {Client}
         */
        this.client = node.client;
        /**
         * Song UUID
         * @type {String}
         */
        this.uuid = uuid;
        /**
         * Stream
         * @type {stream.Readable}
         */
        this.stream = stream;
        /**
         * Song title
         * @type {?String}
         */
        this.title = data.title;
        /**
         * Song author
         * @type {?String}
         */
        this.author = data.author;
        /**
         * Song cover
         * @type {?String}
         */
        this.cover = data.cover;
        /**
         * Song description
         * @type {?String}
         */
        this.description = data.description;
        /**
         * Stream formats
         * @type {?ytdl.videoFormat[]}
         */
        this.formats = data.formats;
        /**
         * Stream mimeType formats
         * @type {?String[]}
         */
        this.availableFormats = data.availableFormats;
        /**
         * Stream service
         * @type {?String}
         */
        this.service = data.service;
        /**
         * Song url
         * @type {?String}
         */
        this.url = data.url;
    }
    ;
    /**
     * Delete node
     * @return {void}
     */
    delete() {
        this.node.queue.delete(this.uuid);
    }
    ;
    /**
     * Fill information
     * @param {?String} url - Stream url
     * @return {Promise<Song>}
     * @example
     * fillInfo();
     * @example
     * fillInfo('youtube video url');
     */
    fillInfo(url = this.url) {
        return new Promise(async (resolve) => {
            if (this.service == 'youtube') {
                await ytdl_core_1.getBasicInfo(url).then((info) => {
                    this.title = info.videoDetails.title;
                    this.author = info.videoDetails.author.name;
                    this.cover = info.videoDetails.thumbnail.thumbnails[0].url;
                    this.description = info.videoDetails.shortDescription;
                    this.formats = info.formats;
                    this.availableFormats = this.formats?.map((format) => format.mimeType.split(/;/g).shift());
                    resolve(this);
                });
            }
            ;
            resolve(this);
        });
    }
    ;
    /**
     * Return Song object
     * @return {SongObject}
     */
    toJSON() {
        return {
            uuid: this.uuid,
            title: this.title,
            author: this.author,
            cover: this.cover,
            description: this.description,
            formats: this.formats,
            service: this.service,
            url: this.url,
        };
    }
    ;
}
;
exports.default = Song;
