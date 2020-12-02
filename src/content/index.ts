'use strict';

import * as express from 'express';
import {Application} from 'express';
import Client, {Route} from '../Client/Client';
const app = express();

/**
 * Application content
 * @param {Client} client - Ongaku client
 * @param {Route} route - App route
 * @return {express.Application}
 */
function content(client: Client, route: Route): Application {
  if (!route?.middlewares) client.emit('warn', 'No middlewares found');

  for (const middleware of route?.middlewares || []) {
    client.emit('debug', `[MIDDLEWARE] ${middleware.name} loaded`);
    if (!middleware.useClient) {
      app.use(middleware.view);
      continue;
    };
    app.use((req, res, next): void => {
      const md = middleware.view(client, req, res);
      if (!md.status) {
        res.status(400).json({
          error: true,
          ...md,
        });
        return;
      };
      next();
    });
  };

  if (!route?.routes) client.emit('warn', 'No routes found');

  for (const _route of route?.routes || []) {
    client.emit('debug', `[ROUTE] ${_route.name} loaded`);
    app[_route.method](_route.route, (...args: [any, any]) => _route.view(client, ...args));
  };

  return app;
};

export default content;
