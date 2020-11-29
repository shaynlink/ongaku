'use strict';

module.exports = exports = {
  Client: require('./Client/Client'),

  version: require('./../package.json').version,

  content: require('./content'),

  Node: require('./Less/Node'),
  Player: require('./Less/Player'),
  Song: require('./Less/Song'),

  Authentification: require('./middlewares/Authentification'),

  OpusPipe: require('./pipe/Opus.pipe'),
  PCMPipe: require('./pipe/PCM.pipe'),
  VolumePipe: require('./pipe/Volume.pipe'),

  routes: require('./routes'),

  Rest: require('./Server/Rest'),

  Util: require('./util/Util'),

  addSong: require('./views/addSong'),
  createNode: require('./views/createNode'),
  deleteNode: require('./views/deleteNode'),
  getQueueNode: require('./views/getQueueNode'),
  index: require('./views/'),
  infoNode: require('./views/infoNode'),
  infoSong: require('./views/infoSong'),
  player: require('./views/player'),
  removeSong: require('./views/removeSong'),
};
