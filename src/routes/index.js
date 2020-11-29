'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authentification = require('./../middlewares/Authentification');

const index = require('./../views');
const createNode = require('../views/createNode');
const deleteNode = require('../views/deleteNode');
const infoNode = require('../views/infoNode');
const getQueueNode = require('../views/getQueueNode');
const addSong = require('../views/addSong');
const removeSong = require('../views/removeSong');
const player = require('../views/player');
const infoSong = require('../views/infoSong');

module.exports = exports = {
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
