'use strict';

import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';

import authentification from './../middlewares/Authentification';

import index from './../views';
import createNode from '../views/createNode';
import deleteNode from '../views/deleteNode';
import infoNode from '../views/infoNode';
import getQueueNode from '../views/getQueueNode';
import addSong from '../views/addSong';
import removeSong from '../views/removeSong';
import player from '../views/player';
import infoSong from '../views/infoSong';

export default {
  middlewares: [
    {
      name: 'Authentification',
      view: authentification,
      useClient: true,
    },
    {
      name: 'Json',
      view: express.json(),
      useClient: false,
    },
    {
      name: 'Urlencoded',
      view: express.urlencoded({extended: true}),
      useClient: false,
    },
    {
      name: 'Cors',
      view: cors(),
      useClient: false,
    },
    {
      name: 'Helmet',
      view: helmet(),
      useClient: false,
    },
  ],
  routes: [
    {
      name: 'index',
      route: '/',
      view: index,
      method: 'get',
    },
    {
      name: 'Create node',
      route: '/node/create',
      view: createNode,
      method: 'get',
    },
    {
      name: 'Delete node',
      route: '/node/:uuid',
      view: deleteNode,
      method: 'delete',
    },
    {
      name: 'Node info',
      route: '/node/:uuid',
      view: infoNode,
      method: 'get',
    },
    {
      name: 'Node queue',
      route: '/node/:uuid/queue',
      view: getQueueNode,
      method: 'get',
    },
    {
      name: 'Add song',
      route: '/node/:uuid/queue',
      view: addSong,
      method: 'put',
    },
    {
      name: 'Remove song',
      route: '/node/:uuid/queue/:suuid',
      view: removeSong,
      method: 'delete',
    },
    {
      name: 'Info song',
      route: '/node/:uuid/queue/:suuid',
      view: infoSong,
      method: 'get',
    },
    {
      name: 'Player',
      route: '/node/:uuid/player',
      view: player,
      method: 'get',
    },
  ],
};
