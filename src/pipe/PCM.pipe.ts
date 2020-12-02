'use strict';

import * as prism from 'prism-media';
import {Readable} from 'stream';

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
  data: Readable;
  args: string[];
  /**
   * @param {stream.Readable} data - Stream readable
   * @param {PCMArgs} args - FFMPEG args
   */
  constructor(data: Readable, args: string[] = FFMPEG_ARGUMENTS) {
    /**
     * Stream
     * @type {stream.Readable}
     */
    this.data = data;

    /**
     * FFMPEG args
     * @type {PCMArgs}
     */
    this.args = args;
  };

  /**
   * Pipe stream
   * @param {PCMArgs} args - FFMPEG args
   * @return {stream.Readable}
   * @example
   * pipe();
   * @example
   * pipe([
   *  '-analyzeduration', '0',
   *  '-loglevel', '0',
   *  '-f', 's16le',
   *  '-ar', '48000',
   *  '-ac', '2',
   * ]);
   */
  pipe(args: string[] = this.args): Readable {
    return this.data.pipe(new prism.FFmpeg({args}));
  };
};

export default PCM;
