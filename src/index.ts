'use strict';

import Client from './Client/Client';
const version = require('../package.json').version;
import content from './content';
import Node from './Less/LessNode';
import Player from './Less/Player';
import Song from './Less/Song';
import Authentification from './middlewares/Authentification';
import OpusPipe from './pipe/Opus.pipe';
import PCMPipe from './pipe/PCM.pipe';
import VolumePipe from './pipe/Volume.pipe';
import routes from './routes';
import Rest from './Server/Rest';
import Util from './util/Util';
import addSong from './views/addSong';
import createNode from './views/createNode';
import deleteNode from './views/deleteNode';
import getQueueNode from './views/getQueueNode';
import index from './views';
import infoNode from './views/infoNode';
import infoSong from './views/infoSong';
import player from './views/player';
import removeSong from './views/removeSong';

export = {
  Client,

  version,

  content,

  Node,
  Player,
  Song,

  Authentification,

  OpusPipe,
  PCMPipe,
  VolumePipe,

  routes,

  Rest,

  Util,

  addSong,
  createNode,
  deleteNode,
  getQueueNode,
  index,
  infoNode,
  infoSong,
  player,
  removeSong,
};
