'use strict';

import Client, {MiddlewareRes} from './../Client/Client';

export interface HeadersSet {
  [key: string]: any
};

/**
 * Check authorization
 * @param {Client} client - Client
 * @param {express.Request} req - Request
 * @param {express.Response} res - Response
 * @return {MiddlewareRes}
 */
function authentification(client: Client, req: any, res: any): MiddlewareRes {
  if (!client.options.token) return {status: true};
  const headers = req.headers as HeadersSet;
  if (headers.authorization == client.options.token) return {status: true};
  else {
    return {
      status: false,
      message: 'Bad token',
    };
  };
};

export default authentification;
