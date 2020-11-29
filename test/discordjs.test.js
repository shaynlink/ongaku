/**
 * Offline mode
*/
'use strict';

const discord = require('discord.js');
const ongaku = require('./../src');
const client = new discord.Client();
const onga = new ongaku.Client();
const config = require('./config');

const prefix = '.';

const musics = new discord.Collection();

// Log if bot is ready
client.on('ready', () => console.log(`${client.user.username} is ready !`));

client.on('message', async (message) => {
  // Ignore discord message and bot message
  if (message.author.bot || message.system) return;

  // Ignore all message if not starts with prefix
  if (!message.content.startsWith(prefix)) return;

  // Remove prefix and split spaces
  const args = message.content.trimStart()
      .slice(prefix.length).trim().split(/ +/g);

  // Get command name and remove it from args
  const command = args.shift().toLowerCase();

  if (command == 'join') {
    // Check if user is in a voice channel
    if (!Boolean(message.member.voice.channelID)) {
      return message.reply('You must join a voice channel');
    };

    // Check if a music is already saved
    if (musics.has(message.guild.id)) {
      // Delete music
      musics.delete(message.guild.id);
    };

    // Create uuid
    const uuid = ongaku.Util.createUUID();
    // Create node
    const node = onga.createNode(uuid, false);
    // Join channel
    const connection = await message.member.voice.channel.join();
    // Create guild music obbject
    const music = {
      node: node,
      connection: connection,
      dispatcher: null,
    };
    // Save music
    musics.set(message.guild.id, music);
  } else if (command == 'play') {
    // Check if user is in a vocie channel
    if (!Boolean(message.member.voice.channelID)) {
      return message.reply('You must join a voice channel');
    };

    // Check if a music is already saved
    if (!musics.has(message.guild.id)) {
      // Create uuid
      const uuid = ongaku.Util.createUUID();
      const node = onga.createNode(uuid, false);
      // Save music
      musics.set(message.guild.id, {
        node: node,
        connection: null,
        dispatcher: null,
      });
    };

    // Get music
    const music = musics.get(message.guild.id);

    // Join channel or reset session
    music.connection = await message.member.voice.channel.join();


    // Check url
    if (!ongaku.Util.verifyYoutubeURL(args.join(''))) {
      return message.channel.send('Please send a valide youtube url video');
    };

    // Add song
    const song = music.node.addSongByURL(args.join(''), 'youtube', {
      filter: 'audioonly',
    });

    // Fill information
    await song.fillInfo();

    // Check if a dispatcher is already saved
    if (!Boolean(music.dispatcher)) {
      message.reply('I\'m now playing');
      play(message, music);
    } else {
      message.reply('Your music is added');
    };
  } else if (command == 'queue') {
    // Check if a music is existing
    if (!musics.has(message.guild.id)) {
      return message.reply('I don\'t playing any music');
    };

    // Get music
    const music = musics.get(message.guild.id);

    // Check is bot is actually playing
    if (!Boolean(music.dispatcher)) {
      return message.reply('I don\'t playing any music');
    };

    // Check if queue is empty
    if (music.node.queue.size < 1) {
      return message.reply('Queue is empty');
    };

    const queue = new discord.MessageEmbed()
        .setDescription(`${message.guild.name} queue (5 first songs)`)
        .addFields(music.node.queue.array().slice(0, 5).map((song, index) => ({
          name: '\u200B',
          value: `[${index + 1}] [${song.title}](${song.url}) - ${song.author}`,
          inline: false,
        })));

    message.channel.send({embed: queue});
  } else if (command == 'nowplaying') {
    // Check if a music is existing
    if (!musics.has(message.guild.id)) {
      return message.reply('I don\'t playing any music');
    };

    // Get music
    const music = musics.get(message.guild.id);

    // Check is bot is actually playing
    if (!Boolean(music.dispatcher)) {
      return message.reply('I don\'t playing any music');
    };

    // Check if queue is empty
    if (music.node.queue.size < 1) {
      return message.reply('Queue is empty');
    };

    const song = music.node.queue.first();

    const nowplaying = new discord.MessageEmbed()
        .setTitle(`${message.guild.name} nowply`)
        .setDescription(`[${song.title}](${song.url})`)
        .setThumbnail(song.cover)
        .addField('Author', song.author, true)
        .addField('Service', song.service, true);

    message.channel.send({embed: nowplaying});
  } else if (command == 'leave') {
    // Check if a music is existing
    if (!musics.has(message.guild.id)) {
      const music = musics.get(message.guild.id);
      // Check if has dispatcher else destroy
      if (Boolean(music.dispatcher)) music.dispatcher.destroy();
      // Check if ha connected else leave
      if (Boolean(music.connection)) music.connection.leave();
      // Delete music
      musics.delete(message.guild.id);
    };
  };
});

/**
 * Play music
 * @param {Message} message - message
 * @param {music} music - music of musics
 */
function play(message, music) {
  // Play song
  music.dispatcher = music.connection.play(music.node.queue.first().stream);

  music.dispatcher.on('error', (err) => {
    console.log(err);
  });

  music.dispatcher.on('finish', () => {
    // Delete song
    music.node.queue.first().delete();
    // Check if queue is empty
    if (music.node.queue.size < 1) {
      // Destroy dispatcher
      music.dispatcher.destroy();
      // Leave in channel
      music.connection.disconnect();
      // Delete music
      musics.delete(message.guild.id);
      // Send message
      message.channel.send('Guild queue is empty');
      return;
    };
    // Play new song
    play(message, music);
  });
};

// Connect bot
client.login(config.token);
