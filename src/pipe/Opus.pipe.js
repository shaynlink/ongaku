'use strict';

const prism = require('prism-media');

/**
 * Opus class
 */
class Opus {
  /**
   * @param {stream.Readable} data - Stream readable
   * @param {OpusOptions} param1 - Opus options
   */
  constructor(data, {channels = 2, rate = 48000, frameSize = 690} = {}) {
    /**
     * @type {stream.Readable}
     */
    this.data = data;

    /**
     * @type {OpusOptions}
     */
    this.options = {channels, rate, frameSize};
  };

  /**
   * Stream pipe
   * @param {OpusOptions} options - Opus options
   * @return {stream.Readable}
   */
  pipe(options = this.options) {
    return this.data.pipe(new prism.opus.Encoder(options));
  };
};

module.exports = exports = Opus;
