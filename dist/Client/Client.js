'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Rest_1 = require("../Server/Rest");
const collection_1 = require("@discordjs/collection");
const LessNode_1 = require("../Less/LessNode");
const content_1 = require("./../content");
const routes_1 = require("./../routes");
;
;
;
;
/**
 * @typedef ClientOptions
 *
 * @property {?Boolean} [token=false] - API token
 * @property {?string} [host="0.0.0.0"] - API host
 * @property {?string} [port="1452"] - API port
 * @property {?express.Application} [app=content] - API app
 * @property {?routes} [routes=routes] - API routes
 */
/**
 * Class Client
 */
class Client extends events_1.EventEmitter {
    /**
     * @param {ClientOptions} param0 - Client options
     */
    constructor({ token = false, host = '0.0.0.0', port = '1452', app = content_1.default, route = routes_1.default, } = {}) {
        super();
        /**
         * Server API
         * @type {Rest}
         */
        this.rest = new Rest_1.default(this, {
            app: app || content_1.default,
            route: route || routes_1.default,
            host: host || '0.0.0.0',
            port: port || '1452',
        });
        /**
         * Client options
         * @type {ClientOptions}
         */
        this.options = {
            token: token || false,
            app: app || content_1.default,
            route: route || routes_1.default,
            host: host || '0.0.0.0',
            port: port || '1452',
        };
        /**
         * LessNode collection
         * @type {Collection<string, LessNode>}
         */
        this.nodes = new collection_1.default();
    }
    ;
    /**
     * Create node
     * @param {string} uuid - UUID
     * @param {?Boolean} [cache=true] - Save node
     * @return {Node}
     */
    createNode(uuid, cache = true) {
        const node = new LessNode_1.default(this, uuid);
        if (cache)
            this.nodes.set(node.uuid, node);
        this.emit('debug', `[*] node created ${node.uuid}`);
        this.emit('nodeCreate', node);
        return node;
    }
    ;
}
;
exports.default = Client;
