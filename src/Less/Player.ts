'use strict';

import * as ytdl from 'ytdl-core';
import Client from '../Client/Client';
import LessNode from './LessNode';
import Song from './Song';
import OpusPipe from '../pipe/Opus.pipe';
import PCMPipe from '../pipe/PCM.pipe';

export type TypeEncode = 'unknow' | 'pcm' | 'opus' | 'ogg' | 'adioonly' | 'audioandvideo' | 'audio' | 'videoandaudio' | 'video' | 'videoonly';

/**
 * Class Player
 */
class Player {
  public node: LessNode;
  public client: Client;
  public res: any;
  /**
   * @param {Node} node - Node
   * @param {express.Response} res - API response
   */
  constructor(node: LessNode, res: any) {
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
     * API response
     * @type {express.Response}
     */
    this.res = res;

    // Set Transfer-Encoding to chunked
    this.res.setHeader('Transfer-Encoding', 'chunked');
  };

  /**
   * Play song
   * @param {TypeEncode} type - Encoding type
   */
  play(type: TypeEncode = 'unknow'): void {
    /**
     * @type {Song}
     */
    const song = this.node.queue.first();

    if (!song) return this.res.end();

    if (song.service == 'youtube') {
      this.youtubePacket(type, song);
    };
  };

  /**
   * Youtube Encoding
   * @param {TypeEncode} type - Encoding type
   * @param {Song} song - Stream readable
   * @return {void}
   * @example
   * node.player.youtubePacket('video/mp4', node.queue.first().song);
   */
  youtubePacket(type: TypeEncode | string, song: Song): void {
    if (!type || type == 'unknow') {
      this.res.setHeader('Content-Type', 'application/octet-stream');

      return ytdl(song.url).pipe(this.res);
    } else if (type.includes('pcm')) {
      this.res.setHeader('Content-Type', 'audio/pcm');

      return new PCMPipe(song.stream).pipe().pipe(this.res);
    } else if (type.includes('opus') || type.includes('ogg')) {
      this.res.setHeader('Content-Type', 'audio/ogg');

      return new OpusPipe(new PCMPipe(song.stream).pipe())
          .pipe().pipe(this.res);
    } else {
      let format;
      let dumb = false;
      if (type == 'audioonly' || type == 'audioandvideo' ||
          type == 'audio' || type == 'videoandaudio' ||
          type == 'video' || type == 'videoonly') {
        format = type;
        dumb = !dumb;
      } else {
        format = song.availableFormats.find((f) => f == type);
      };

      if (!format) {
        return this.res.status(404).json({
          error: true,
          message: 'Format not found',
          params: {
            type,
            format,
            song: song?.toJSON(),
          },
        });
      };

      this.res.setHeader('Content-Type',
        dumb ? 'application/octet-stream' : format);

      let filter;
      let container;

      if (!dumb) {
        filter = format.split(/\//g).shift();
        container = format.split(/\//g).pop();
      };

      ytdl(song.url, {
        filter: dumb ? format : (f) => {
          if (f.container == container &&
              filter == 'audio' ? f.hasAudio == true &&
              f.hasVideo != true : f.hasVideo == true) {
            if (filter == 'audio' ? f.hasAudio == true : f.hasVideo == true) {
              return true;
            } else return false;
          } else return false;
        },
      }).pipe(this.res);
    };
  };

  /**
   * Write packet
   * @param {Buffer} packet - Buffer packet
   * @return {void}
   * @example
   * send(Buffer.from('Hello world'));
   */
  send(packet: Buffer): void {
    this.client.emit('debug', 'Send packet', packet);
    this.res.write(packet);
  };
};

export default Player;
