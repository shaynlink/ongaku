'use strict';

const {Client} = require('../src');
const client = new Client();

client.on('debug', console.log);

client.rest.createServer();
