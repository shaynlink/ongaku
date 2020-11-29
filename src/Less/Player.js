'use strict';

const ytdl = require('ytdl-core');
const OpusPipe = require('../pipe/Opus.pipe');
const PCMPipe = require('../pipe/PCM.pipe');

/**
 * Class Player
 */
class Player {
  /**
   * @param {Node} node - Node
   * @param {express.Response} res - Response
   */
  constructor(node, res) {
    /**
     * @type {Node}
     */
    this.node = node;

    /**
     * @type {Client}
     */
    this.client = node.client;

    /**
     * @type {express.Response}
     */
    this.res = res;

    this.res.setHeader('Transfer-Encoding', 'chunked');
  };

  /**
   * Play song
   * @param {TypeEncode} type - Encoding type
   */
  play(type = 'unknow') {
    /**
     * @type {stream.Readable}
     */
    const song = this.node.queue.first();

    if (!song) this.res.end();

    if (song.service == 'youtube') {
      this.youtubePacket(type, song);
    };
  };

  /**
   * Youtube Encoding
   * @param {TypeEncode} type - Encoding type
   * @param {stream.Readable} song - Stream readable
   * @return {void}
   */
  youtubePacket(type, song) {
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
   */
  send(packet) {
    this.client.emit('debug', 'Send packet', packet);
    this.res.write(packet);
  };
};

module.exports = exports = Player;
