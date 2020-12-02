'use strict';

const ongaku = require('../dist');

console.log(ongaku);

const client = new ongaku.Client();

client.on('debug', console.log);

client.rest.createServer();
