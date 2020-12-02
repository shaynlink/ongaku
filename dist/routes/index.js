'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const Authentification_1 = require("./../middlewares/Authentification");
const views_1 = require("./../views");
const createNode_1 = require("../views/createNode");
const deleteNode_1 = require("../views/deleteNode");
const infoNode_1 = require("../views/infoNode");
const getQueueNode_1 = require("../views/getQueueNode");
const addSong_1 = require("../views/addSong");
const removeSong_1 = require("../views/removeSong");
const player_1 = require("../views/player");
const infoSong_1 = require("../views/infoSong");
exports.default = {
    middlewares: [
        {
            name: 'Authentification',
            view: Authentification_1.default,
            useClient: true,
        },
        {
            name: 'Json',
            view: express.json(),
            useClient: false,
        },
        {
            name: 'Urlencoded',
            view: express.urlencoded({ extended: true }),
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
            view: views_1.default,
            method: 'get',
        },
        {
            name: 'Create node',
            route: '/node/create',
            view: createNode_1.default,
            method: 'get',
        },
        {
            name: 'Delete node',
            route: '/node/:uuid',
            view: deleteNode_1.default,
            method: 'delete',
        },
        {
            name: 'Node info',
            route: '/node/:uuid',
            view: infoNode_1.default,
            method: 'get',
        },
        {
            name: 'Node queue',
            route: '/node/:uuid/queue',
            view: getQueueNode_1.default,
            method: 'get',
        },
        {
            name: 'Add song',
            route: '/node/:uuid/queue',
            view: addSong_1.default,
            method: 'put',
        },
        {
            name: 'Remove song',
            route: '/node/:uuid/queue/:suuid',
            view: removeSong_1.default,
            method: 'delete',
        },
        {
            name: 'Info song',
            route: '/node/:uuid/queue/:suuid',
            view: infoSong_1.default,
            method: 'get',
        },
        {
            name: 'Player',
            route: '/node/:uuid/player',
            view: player_1.default,
            method: 'get',
        },
    ],
};
