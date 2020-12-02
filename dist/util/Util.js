'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class Util
 */
class Util {
    /**
     * Create UUID
     * @static
     * @return {string}
     */
    static createUUID() {
        const schema = [8, 4, 4, 12];
        const delemiter = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return schema.map((value) => {
            let src = '';
            for (let i = 0; i < value; i++) {
                src += delemiter[Math.floor(Math.random() * delemiter.length)];
            }
            ;
            return src;
        }).join('-');
    }
    ;
    /**
     * Verify youtube URL
     * @static
     * @param {String} url - url
     * @return {Boolean}
     * @example
     * verifyYoutubeURL('youtbe video url');
     */
    static verifyYoutubeURL(url) {
        return /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
            .test(url);
    }
    ;
}
;
exports.default = Util;
