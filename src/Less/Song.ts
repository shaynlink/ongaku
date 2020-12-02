'use strict';

import {getBasicInfo, videoFormat} from 'ytdl-core';
import Client from '../Client/Client';
import Node from './LessNode';
import {Readable} from 'stream';

export interface SongData {
  title?: string;
  author?: string;
  cover?: string;
  description?: string;
  formats?: videoFormat[];
  availableFormats?: string[];
  service?: string;
  url?: string;
};

export interface SongObject extends SongData {
  uuid: string;
};

/**
 * class Song
 */
class Song {
  public node: Node;
  public client: Client;
  public uuid: string;
  public stream: Readable;
  public title?: string;
  public author?: string;
  public cover?: string;
  public description?: string;
  public formats?: videoFormat[];
  public availableFormats?: string[];
  public service?: string;
  public url?: string;
  /**
   * @param {Node} node - Node
   * @param {String} uuid - UUID
   * @param {SongData} data - Song data
   * @param {stream.Readable} stream - Stream readable
   */
  constructor(node: Node, uuid: string, data: SongData, stream: Readable) {
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
  };

  /**
   * Delete node
   * @return {void}
   */
  delete(): void {
    this.node.queue.delete(this.uuid);
  };

  /**
   * Fill information
   * @param {?String} url - Stream url
   * @return {Promise<Song>}
   * @example
   * fillInfo();
   * @example
   * fillInfo('youtube video url');
   */
  fillInfo(url: string = this.url): Promise<Song> {
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
   * Return Song object
   * @return {SongObject}
   */
  toJSON(): SongObject {
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

export default Song;
