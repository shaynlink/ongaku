'use strict';

const {EventEmitter} = require('events');
const Rest = require('./../Server/Rest');
const Collection = require('@discordjs/collection');
const Node = require('./../Less/Node');
const content = require('./../content');
const routes = require('./../routes');

/**
 * @typedef ClientOptions
 *
 * @property {?Boolean} [token=false] - API token
 * @property {?String} [host="0.0.0.0"] - API host
 * @property {?String} [port="1452"] - API port
 * @property {?express.Application} [app=content] - API app
 * @property {?routes} [routes=routes] - API routes
 */

/**
 * Class Client
 */
class Client extends EventEmitter {
  /**
   * @param {ClientOptions} param0 - Client options
   */
  constructor({
    token = false,
    host = '0.0.0.0',
    port = '1452',
    app = content,
    route = routes,
  } = {}) {
    super();

    /**
     * Server API
     * @type {Rest}
     */
    this.rest = new Rest(this, {app, route, host, port});

    /**
     * Client options
     * @type {ClientOptions}
     */
    this.options = {token, host, port, app, route};

    /**
     * Node collection
     * @type {Collection<String, Node>}
     */
    this.nodes = new Collection();
  };

  /**
   * Create node
   * @param {String} uuid - UUID
   * @param {?Boolean} [cache=true] - Save node
   * @return {Node}
   */
  createNode(uuid, cache = true) {
    const node = new Node(this, uuid);
    if (cache) this.nodes.set(node.uuid, node);
    this.emit('debug', `[*] node created ${node.uuid}`);
    this.emit('nodeCreate', node);
    return node;
  };
};

module.exports = exports = Client;
