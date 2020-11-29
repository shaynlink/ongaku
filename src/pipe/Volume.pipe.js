'use strict';

const prism = require('prism-media');

/**
 * Class Volume pipe
 */
class Volume {
  /**
   * @param {stream.Readable} data - Stream Readable
   * @param {VolumeOptions} param1 - Volume options
   */
  constructor(data, {volume = 1, volumeType = 's16le'} = {}) {
    /**
     * @type {stream.Readable}
     */
    this.data = data;

    /**
     * @type {VolumeOptions}
     */
    this.options = {volume: parseInt(volume), volumeType};
  };

  /**
   * Pipe stream
   * @param {VolumeOptions} options - Volume options
   * @return {stream.Readable}
   */
  pipe(options = this.options) {
    return this.data.pipe(new prism.VolumeTransformer(options));
  };
};

module.exports = exports = Volume;
