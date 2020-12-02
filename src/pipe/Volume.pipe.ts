'use strict';

import * as prism from 'prism-media';
import {Readable} from 'stream';

export interface VolumeOptions {
  volume: number;
  type: 's16le' | 's16be' | 's32le' | 's32be';
};

/**
 * Class Volume pipe
 */
class Volume {
  data: Readable;
  options: VolumeOptions;
  /**
   * @param {stream.Readable} data - Stream Readable
   * @param {VolumeOptions} param1 - Volume options
   */
  constructor(data, options: VolumeOptions = {volume: 1, type: 's16le'}) {
    /**
     * Stream
     * @type {stream.Readable}
     */
    this.data = data;

    /**
     * Volume Transformer options
     * @type {VolumeOptions}
     */
    this.options = options;
  };

  /**
   * Pipe stream
   * @param {VolumeOptions} options - Volume options
   * @return {stream.Readable}
   * @example
   * pipe();
   * @example
   * pipe({volume: 1, type: 's16le'});
   */
  pipe(options: VolumeOptions = this.options) {
    return this.data.pipe(new prism.VolumeTransformer(options) as any);
  };
};

export default Volume;
