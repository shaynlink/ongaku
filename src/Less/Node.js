'use strict';

const Collection = require('@discordjs/collection');
const Song = require('./Song');
const Util = require('./../util/Util');
const Player = require('./Player');
const ytdl = require('ytdl-core');

/**
 * Class Node
 */
class Node {
  /**
   * @param {Client} client - Ongaku Client
   * @param {String} uuid - UUID
   */
  constructor(client, uuid) {
    /**
     * Ongaku Client
     * @type {Client}
     */
    this.client = client;

    /**
     * Node UUID
     * @type {string}
     */
    this.uuid = uuid;

    /**
     * Song collection
     * @type {Collection<string, Song>}
     */
    this.queue = new Collection();

    /**
     * Hook ID
     * @type {string}
     */
    this.hookID = 'hook_' + uuid;

    /**
     * Node player
     * @type {?Player}
     */
    this.player;
  };

  /**
   * Return hook url
   * @return {String}
   */
  get hookURL() {
    return `http://${
      this.client.options.host
    }:${
      this.client.options.port
    }/nodes/${
      this.uuid
    }/hook`;
  };

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
    const song = new Song(this, Util.createUUID(), data, stream);
    this.queue.set(song.uuid, song);
    return song;
  };

  /**
   * Add song in queue by url
   * @param {String} url - Video/Song url
   * @param {'youtube'} service - Service
   * @param {any} options - Options
   * @return {Song}
   */
  addSongByURL(url, service = 'youtube', options) {
    if (service == 'youtube') {
      const stream = ytdl(url, options);
      const song = new Song(this, Util.createUUID(), {
        url,
        service,
      }, stream);
      this.queue.set(song.uuid, song);
      return song;
    } else return new Error('Service not supported');
  };

  /**
   * Delete node
   * @return {void}
   */
  delete() {
    this.client.nodes.delete(this.uuid);
  };

  /**
   * Return node object
   * @return {NodeData}
   */
  toJSON() {
    return {
      uuid: this.uuid,
      queue: this.queue.array().map((song) => song.toJSON()),
      hookID: this.hookID,
    };
  };

  /**
   * Create player (only for API)
   * @param {express.response} res - API response
   * @return {Player}
   * @example
   * createPlayer(res);
   */
  createPlayer(res) {
    return this.player = new Player(this, res);
  };
};

module.exports = exports = Node;
