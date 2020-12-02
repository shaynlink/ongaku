'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
/**
 * Class REst
 */
class Rest {
    /**
     * @param {Client} client - Ongaku Client
     * @param {RestOptions} param1 - Rest options
     */
    constructor(client, options) {
        /**
         * Client
         * @type {Client}
         */
        this.client = client;
        /**
         * Server options
         * @type {RestOptions}
         */
        this.options = options;
        /**
         * API app
         * @type {express.Application}
         */
        this.app = options.app;
        /**
         * Http server
         * @type {?http.Server}
         */
        this.server;
    }
    ;
    /**
     * Create server
     * @return {Server}
     * @emits debug
     */
    createServer() {
        return this.server = http.createServer(this.app(this.client, this.options.route))
            .listen(this.options.port, this.options.host, 0, () => true)
            .once('listening', () => this.client.emit('debug', '[REST] server listening at http://%s:%s/', this.options.host, this.options.port));
    }
    ;
}
;
exports.default = Rest;
