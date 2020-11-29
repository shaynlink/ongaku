declare module 'ongaku' {
  import { EventEmitter } from 'events';
  import { Request, Response, Application } from 'express';
  import  {Collection } from '@discordjs/collection';
  import { Readable } from 'stream';
  import { videoFormat } from 'ytdl-core';
  import { Server } from 'http';

  //#region

  export interface MiddlewareRes {
    status: Boolean;
    message?: String;
  };

  export interface Route {
    middlewares: {
      name: String;
      view: (client: Client, req: Request, res: Response) => MiddlewareRes;
      useClient: Boolean;
    }[];
    routes: {
      name: String;
      route: String;
      view: (client: Client, req: Request, res: Response) => void;
      method: String;
    }[];
  };

  export interface ClientOptions {
    token: false;
    host: '0.0.0.0';
    port: '1452';
    app: (client: Client, route: Route) => Application;
    route: Route;
  };

  export class Client extends EventEmitter {
    constructor({}: ClientOptions);

    public rest: Rest;
    public options: ClientOptions;
    public nodes: Collection<String, Node>;

    public createNode(uuid: String, cache: ?Boolean): Node;
  };

  export function content(client: Client, route: Route): Application;

  export interface NodeData {
    uuid: String;
    queue: SongData[];
    hookID: String;
  };

  export interface SongData {
    title: ?String;
    author: ?String;
    cover: ?String;
    description: ?String;
    formats: ?videoFormat[];
    availableFormats: ?string[];
    service: ?string;
    url: ?string;
  };

  export interface SongObject extends NodeData {
    uuid: String;
  };

  export class Node {
    constructor(client: Client, uuid: String);

    public client: Client;
    public uuid: String;
    public queue: Collection<String, Song>;
    public hookID: String;
    public player: ?Player;

    public get hookURL(): String;

    public addSong(stream: Readable, data: SongData);
    public addSongByID(url: String, service: 'youtube', options: any[]): Song;
    public delete(): void;
    public toJSON(): NodeData;
    public createPlayer(res: Response): Player;
  };

  export type TypeEncode = 'unknow' | 'pcm' | 'opus' | 'ogg' | 'adioonly' | 'audioandvideo' | 'audio' | 'videoandaudio' | 'video' | 'videoonly';

  export class Player {
    constructor(node: Node, res: Response);

    public node: Node;
    public client: Client;
    public res: Response;
    
    public play(type: TypeEncode | String = 'unknow', song: Song): void;
    public youtubePacket(type: TypeEncode | String, song: Song): void;
    public send(packet: Buffer): void;
  };

  export class Song {
    constructor(node: Node, uuid: String, data: SongData, stream: Readable);
    
    public node: Node;
    public client: Client;
    public stream: Readable;
    public title: ?String;
    public author: ?String;
    public cover: ?String;
    public description: ?String;
    public formats: ?videoFormat[];
    public availableFormats: ?String[];
    public service: ?String;
    public url: ?String;

    public delete(): void;
    public fillInfo(url: ?String): Promise<Song>;
    public toJSON(): SongObject;
  };

  export function authentification(client: Client, req: Request, res: Response): MiddlewareRes;

  export interface OpusOptions {
    channel: 2;
    rate: 48000;
    frameSize: 690;
  };

  export class Opus {
    constructor(data: Readable, {channel = 2, rate = 48000, frameSize = 690}: OpusOptions);

    public data: Readable;
    public options: OpusOptions;
    
    public pipe(options: ?OpusOptions): Readable;
  };

  export type PCMArgs = ['-analyzeduration', '0', '-loglevel', '0', '-f', 's16le', '-ar', '48000', '-ac', '2'];

  export class PCM {
    constructor(data: Readable, args: PCMArgs | String[]);

    public data: Readable;
    public args: PCMArgs | String[];

    public pipe(args: ?String[]): Readable;
  };

  export interface VolumeOptions {
    volume: 1;
    volumeType: 's16le';
  };

  export class Volume {
    constructor(data: Readable, {volume = 1, volumeType = 's16le'}: VolumeOptions);

    public data: Readable;
    public options: VolumeOptions;

    public pipe(options: ?VolumeOptions): Readable;
  };

  export interface RestOptions {
    app: Application;
    route: Route;
    host: String;
    port: String;
  };

  export class Rest {
    constructor(client: Client, {app, route, host, port}: RestOptions);

    public client: Client;
    public options: RestOptions;
    public app: Application;
    public server: ?http.Server;

    public createServer(): Server;
  };

  export class Util {
    public static createUUID(): String;
    public static verifyYoutubeURL(url: String): Boolean;
  };

  //#endregion
}