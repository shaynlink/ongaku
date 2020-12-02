'use strict';

import {Readable} from 'stream';
import * as prism from 'prism-media';

export interface OpusOptions {
  channels: number;
  rate: number;
  frameSize: number;
};

/**
 * Opus class
 */
class Opus {
  data: Readable;
  options: OpusOptions;
  /**
   * @param {stream.Readable} data - Stream readable
   * @param {?OpusOptions} param1 - Opus options
   */
  constructor(data: Readable, options: OpusOptions = {channels: 2, rate: 48000, frameSize: 690}) {
    /**
     * Stream
     * @type {stream.Readable}
     */
    this.data = data;

    /**
     * Opus options
     * @type {OpusOptions}
     */
    this.options = options;
  };

  /**
   * Stream pipe
   * @param {OpusOptions} options - Opus options
   * @return {stream.Readable}
   * @example
   * pipe();
   * @example
   * pipe({channels: 2, rate: 48e3, frameSize: 690});
   */
  pipe(options: OpusOptions = this.options): Readable {
    return this.data.pipe(new prism.opus.Encoder(options));
  };
};

export default Opus;