'use strict';

const {Client, Util} = require('./../src');
const ytdl = require('ytdl-core');

const client = new Client();

client.on('debug', console.log);
client.on('warn', console.warn);

client.rest.createServer();

const node = client.createNode(Util.createUUID());

node.addSong(ytdl('https://www.youtube.com/watch?v=uNb3Bq3zQaM', {
  filter: 'audioonly',
}), {
  url: 'https://www.youtube.com/watch?v=uNb3Bq3zQaM',
  service: 'youtube',
}).fillInfo();

console.log(node.uuid);
