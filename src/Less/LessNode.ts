'use strict';

import Client from '../Client/Client';
import Collection from '@discordjs/collection';
import Song, {SongObject, SongData} from './Song';
import Player from './Player';
import Util from '../util/Util';
import * as ytdl from 'ytdl-core';
import {Readable} from 'stream';

export interface LessNodeData {
  uuid: string;
  queue: SongObject[];
  hookID: string;
};

/**
 * Class Node
 */
class LessNode {
  public client: Client;
  public uuid: string;
  public queue: Collection<string, Song>;
  public hookID: string;
  public player?: Player;
  /**
   * @param {Client} client - Ongaku Client
   * @param {string} uuid - UUID
   */
  constructor(client: Client, uuid: string) {
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
    this.queue = new Collection();

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
  };

  /**
   * Return hook url
   * @return {string}
   */
  get hookURL(): string {
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
  addSong(stream: Readable, data: SongData): Song {
    const song = new Song(this, Util.createUUID(), data, stream);
    this.queue.set(song.uuid, song);
    return song;
  };

  /**
   * Add song in queue by url
   * @param {string} url - Video/Song url
   * @param {'youtube'} service - Service
   * @param {any} options - Options
   * @return {Song}
   */
  addSongByURL(url: string, service: string = 'youtube', options: ytdl.downloadOptions): Song | Error {
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
   * Delete LessNode
   * @return {void}
   */
  delete(): void {
    this.client.nodes.delete(this.uuid);
  };

  /**
   * Return LessNode object
   * @return {LessNodeData}
   */
  toJSON(): LessNodeData {
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
  createPlayer(res): Player {
    return this.player = new Player(this, res);
  };
};

export default LessNode;
