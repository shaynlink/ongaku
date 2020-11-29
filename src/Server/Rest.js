'use strict';

const http = require('http');

/**
 * Class REst
 */
class Rest {
  /**
   * @param {Client} client - Ongaku Client
   * @param {RestOptions} param1 - Rest options
   */
  constructor(client, {app, route, host, port} = {}) {
    /**
     * Client
     * @type {Client}
     */
    this.client = client;

    /**
     * Server options
     * @type {RestOptions}
     */
    this.options = {app, route, host, port};

    /**
     * API app
     * @type {express.Application}
     */
    this.app = app;

    /**
     * Http server
     * @type {?http.Server}
     */
    this.server;
  };

  /**
   * Create server
   * @return {Server}
   * @emits debug
   */
  createServer() {
    return this.server = http.createServer(
        this.app(this.client, this.options.route))
        .listen(this.options.port, this.options.host)
        .once('listening', () =>
          this.client.emit('debug',
              '[REST] server listening at http://%s:%s/',
              this.options.host, this.options.port));
  };
};

module.exports = exports = Rest;
