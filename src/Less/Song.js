'use strict';

const {getBasicInfo} = require('ytdl-core');

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
     * @type {Node}
     */
    this.node = node;

    /**
     * @type {Client}
     */
    this.client = node.client;

    /**
     * @type {String}
     */
    this.uuid = uuid;

    /**
     * @type {stream.Readable}
     */
    this.stream = stream;

    /**
     * @type {?String}
     */
    this.title = data.title;

    /**
     * @type {?String}
     */
    this.author = data.author;

    /**
     * @type {?String}
     */
    this.cover = data.cover;

    /**
     * @type {?String}
     */
    this.description = data.description;

    /**
     * @type {?ytdl.videoFormat[]}
     */
    this.formats = data.formats;

    /**
     * @type {?String[]}
     */
    this.availableFormats = data.availableFormats;

    /**
     * @type {?String}
     */
    this.service = data.service;

    /**
     * @type {?String}
     */
    this.url = data.url;
  };

  /**
   * Delete node
   * @return {void}
   */
  delete() {
    this.node.queue.delete(this.uuid);
  };

  /**
   * Fill information
   * @param {?String} url - Stream url
   * @return {Promise<Song>}
   */
  fillInfo(url = this.url) {
    return new Promise(async (resolve) => {
      if (this.service == 'youtube') {
        await getBasicInfo(url).then((info) => {
          this.title = info.videoDetails.title;
          this.author = info.videoDetails.author.name;
          this.cover = info.videoDetails.thumbnail.thumbnails[0].url;
          this.description = info.videoDetails.shortDescription;
          this.formats = info.formats;
          this.availableFormats = this.formats?.map((format) =>
            format.mimeType.split(/;/g).shift());
          resolve(this);
        });
      };
      resolve(this);
    });
  };

  /**
   * Return JSON
   * @return {SongData}
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
  };
};

module.exports = exports = Song;
