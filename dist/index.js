'use strict';
const Client_1 = require("./Client/Client");
const version = require('../package.json').version;
const content_1 = require("./content");
const LessNode_1 = require("./Less/LessNode");
const Player_1 = require("./Less/Player");
const Song_1 = require("./Less/Song");
const Authentification_1 = require("./middlewares/Authentification");
const Opus_pipe_1 = require("./pipe/Opus.pipe");
const PCM_pipe_1 = require("./pipe/PCM.pipe");
const Volume_pipe_1 = require("./pipe/Volume.pipe");
const routes_1 = require("./routes");
const Rest_1 = require("./Server/Rest");
const Util_1 = require("./util/Util");
const addSong_1 = require("./views/addSong");
const createNode_1 = require("./views/createNode");
const deleteNode_1 = require("./views/deleteNode");
const getQueueNode_1 = require("./views/getQueueNode");
const views_1 = require("./views");
const infoNode_1 = require("./views/infoNode");
const infoSong_1 = require("./views/infoSong");
const player_1 = require("./views/player");
const removeSong_1 = require("./views/removeSong");
module.exports = {
    Client: Client_1.default,
    version,
    content: content_1.default,
    Node: LessNode_1.default,
    Player: Player_1.default,
    Song: Song_1.default,
    Authentification: Authentification_1.default,
    OpusPipe: Opus_pipe_1.default,
    PCMPipe: PCM_pipe_1.default,
    VolumePipe: Volume_pipe_1.default,
    routes: routes_1.default,
    Rest: Rest_1.default,
    Util: Util_1.default,
    addSong: addSong_1.default,
    createNode: createNode_1.default,
    deleteNode: deleteNode_1.default,
    getQueueNode: getQueueNode_1.default,
    index: views_1.default,
    infoNode: infoNode_1.default,
    infoSong: infoSong_1.default,
    player: player_1.default,
    removeSong: removeSong_1.default,
};
