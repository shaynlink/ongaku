'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const prism = require("prism-media");
;
/**
 * Class Volume pipe
 */
class Volume {
    /**
     * @param {stream.Readable} data - Stream Readable
     * @param {VolumeOptions} param1 - Volume options
     */
    constructor(data, options = { volume: 1, type: 's16le' }) {
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
    }
    ;
    /**
     * Pipe stream
     * @param {VolumeOptions} options - Volume options
     * @return {stream.Readable}
     * @example
     * pipe();
     * @example
     * pipe({volume: 1, type: 's16le'});
     */
    pipe(options = this.options) {
        return this.data.pipe(new prism.VolumeTransformer(options));
    }
    ;
}
;
exports.default = Volume;
