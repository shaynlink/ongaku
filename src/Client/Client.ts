'use strict';

import {EventEmitter} from 'events';
import Rest from '../Server/Rest';
import Collection from '@discordjs/collection';
import LessNode from '../Less/LessNode';
import content from './../content';
import routes from './../routes';
import {Application} from 'express';

export interface MiddlewareRes {
  status: Boolean;
  message?: string;
};

export interface Route {
  middlewares: {
    name: string;
    view: (client: Client, req: any, res: any) => MiddlewareRes;
    useClient: Boolean;
  }[];
  routes: {
    name: string;
    route: string;
    view: (client: Client, req: any, res: any) => any;
    method: string;
  }[];
};

export interface RestOptions {
  host?: string;
  port?: string;
  app?: (client: Client, route: Route) => Application;
  route?: Route;
};

export interface ClientOptions extends RestOptions{
  token?: Boolean;
};

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
class Client extends EventEmitter {
  public rest: Rest;
  public options: ClientOptions;
  public nodes: Collection<string, LessNode>;

  /**
   * @param {ClientOptions} param0 - Client options
   */
  constructor({
    token = false,
    host = '0.0.0.0',
    port = '1452',
    app = content,
    route = routes as Route,
  }: ClientOptions = {} || null) {
    super();

    /**
     * Server API
     * @type {Rest}
     */
    this.rest = new Rest(this, {
      app: app || content,
      route: route || routes as Route,
      host: host || '0.0.0.0',
      port: port || '1452',
    });

    /**
     * Client options
     * @type {ClientOptions}
     */
    this.options = {
      token: token || false,
      app: app || content,
      route: route || routes as Route,
      host: host || '0.0.0.0',
      port: port || '1452',
    };

    /**
     * LessNode collection
     * @type {Collection<string, LessNode>}
     */
    this.nodes = new Collection();
  };

  /**
   * Create node
   * @param {string} uuid - UUID
   * @param {?Boolean} [cache=true] - Save node
   * @return {Node}
   */
  createNode(uuid: string, cache: Boolean = true): LessNode {
    const node = new LessNode(this, uuid);
    if (cache) this.nodes.set(node.uuid, node);
    this.emit('debug', `[*] node created ${node.uuid}`);
    this.emit('nodeCreate', node);
    return node;
  };
};

export default Client;
