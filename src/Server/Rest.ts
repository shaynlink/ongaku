'use strict';

import * as http from 'http';
import Client, {RestOptions, Route} from '../Client/Client';

/**
 * Class REst
 */
class Rest {
  client: Client;
  options: RestOptions;
  app: (Client, route: Route) => Express.Application;
  server?: http.Server;
  /**
   * @param {Client} client - Ongaku Client
   * @param {RestOptions} param1 - Rest options
   */
  constructor(client: Client, options: RestOptions) {
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
  };

  /**
   * Create server
   * @return {Server}
   * @emits debug
   */
  createServer() {
    return this.server = http.createServer(
        this.app(this.client, this.options.route))
        .listen(this.options.port as any, this.options.host, 0, () => true)
        .once('listening', () =>
          this.client.emit('debug',
              '[REST] server listening at http://%s:%s/',
              this.options.host, this.options.port));
  };
};

export default Rest;
