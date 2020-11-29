'use strict';

const prism = require('prism-media');

const FFMPEG_ARGUMENTS = [
  '-analyzeduration', '0',
  '-loglevel', '0',
  '-f', 's16le',
  '-ar', '48000',
  '-ac', '2',
];

/**
 * Class PCM pipe
 */
class PCM {
  /**
   * @param {stream.Readable} data - Stream readable
   * @param {PCMArgs} args - FFMPEG args
   */
  constructor(data, args = FFMPEG_ARGUMENTS) {
    /**
     * @type {stream.Readable}
     */
    this.data = data;

    /**
     * @type {PCMArgs}
     */
    this.args = args;
  };

  /**
   * Pipe stream
   * @param {PCMArgs} args - FFMPEG args
   * @return {stream.Readable}
   */
  pipe(args = this.args) {
    return this.data.pipe(new prism.FFmpeg({args}));
  };
};

module.exports = exports = PCM;
