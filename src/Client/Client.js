'use strict';

const {EventEmitter} = require('events');
const Rest = require('./../Server/Rest');
const Collection = require('@discordjs/collection');
const Node = require('./../Less/Node');

/**
 * Class Client
 * @extends EventEmitter
 */
class Client extends EventEmitter {
  /**
   * @param {ClientOptions} param0 - Client options
   */
  constructor({
    token = false,
    host = '0.0.0.0',
    port = '1452',
    app = require('./../content'),
    route = require('./../routes'),
  } = {}) {
    super();

    /**
     * @type {Rest}
     */
    this.rest = new Rest(this, {app, route, host, port});

    /**
     * @type {ClientOptions}
     */
    this.options = {token, host, port, app, route};

    /**
     * @type {Collection<String, Node>}
     */
    this.nodes = new Collection();
  };

  /**
   * Create node
   * @param {String} uuid - UUID
   * @param {Boolean} cache - Save node
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
