declare module 'ongaku' {
  import { EventEmitter } from 'events';
  import  {Collection } from '@discordjs/collection';
  import { Readable } from 'stream';
  import { videoFormat } from 'ytdl-core';
  import { Server } from 'http';

  //#region

  export interface MiddlewareRes {
    status: Boolean;
    message?: string;
  }

  export interface Route {
    middlewares: {
      name: string;
      view: (client: Client, req: any, res: any) => MiddlewareRes;
      useClient: Boolean;
    }[];
    routes: {
      name: string;
      route: string;
      view: (client: Client, req: any, res: any) => void;
      method: string;
    }[];
  }

  export interface ClientOptions {
    token: false;
    host: '0.0.0.0';
    port: '1452';
    app: (client: Client, route: Route) => Express.Application;
    route: Route;
  }

  export class Client extends EventEmitter {
    constructor({}: ClientOptions);

    public rest: Rest;
    public options: ClientOptions;
    public nodes: Collection<string, LessNode>;

    public createNode(uuid: string, cache?: Boolean): LessNode;
  }

  export function content(client: Client, route: Route): Express.Application;

  export interface LessNodeData {
    uuid: string;
    queue: SongData[];
    hookID: string;
  }

  export interface SongData {
    title?: string;
    author?: string;
    cover?: string;
    description?: string;
    formats?: videoFormat[];
    availableFormats?: string[];
    service?: string;
    url?: string;
  }

  export interface SongObject extends SongData {
    uuid: string;
  }

  export class LessNode {
    constructor(client: Client, uuid: string);

    public client: Client;
    public uuid: string;
    public queue: Collection<string, Song>;
    public hookID: string;
    public player?: Player;

    public get hookURL(): string;

    public addSong(stream: Readable, data: SongData);
    public addSongByID(url: string, service: 'youtube', options: any[]): Song;
    public delete(): void;
    public toJSON(): LessNode;
    public createPlayer(res: any): Player;
  }

  export type TypeEncode = 'unknow' | 'pcm' | 'opus' | 'ogg' | 'adioonly' | 'audioandvideo' | 'audio' | 'videoandaudio' | 'video' | 'videoonly';

  export class Player {
    constructor(node: LessNode, res: any);

    public node: LessNode;
    public client: Client;
    public res: any;
    
    public play(type: TypeEncode | string, song: Song): void;
    public youtubePacket(type: TypeEncode | string, song: Song): void;
    public send(packet: Buffer): void;
  }

  export class Song {
    constructor(node: LessNode, uuid: string, data: SongData, stream: Readable);
    
    public node: LessNode;
    public client: Client;
    public stream: Readable;
    public title?: string;
    public author?: string;
    public cover?: string;
    public description?: string;
    public formats?: videoFormat[];
    public availableFormats?: string[];
    public service?: string;
    public url?: string;

    public delete(): void;
    public fillInfo(url?: string): Promise<Song>;
    public toJSON(): SongObject;
  }

  export function authentification(client: Client, req: any, res: any): MiddlewareRes;

  export interface OpusOptions {
    channels: 2;
    rate: 48000;
    frameSize: 690;
  }

  export class Opus {
    constructor(data: Readable, {channels, rate, frameSize}: OpusOptions);

    public data: Readable;
    public options: OpusOptions;
    
    public pipe(options?: OpusOptions): Readable;
  }

  export type PCMArgs = ['-analyzeduration', '0', '-loglevel', '0', '-f', 's16le', '-ar', '48000', '-ac', '2'];

  export class PCM {
    constructor(data: Readable, args: PCMArgs | string[]);

    public data: Readable;
    public args: PCMArgs | string[];

    public pipe(args?: string[]): Readable;
  }

  export interface VolumeOptions {
    volume: 1;
    type: 's16le';
  }

  export class Volume {
    constructor(data: Readable, options: VolumeOptions);

    public data: Readable;
    public options: VolumeOptions;

    public pipe(options?: VolumeOptions): Readable;
  }

  export interface RestOptions {
    app: Express.Application;
    route: Route;
    host: string;
    port: string;
  }

  export class Rest {
    constructor(client: Client, {app, route, host, port}: RestOptions);

    public client: Client;
    public options: RestOptions;
    public app: Express.Application;
    public server?: Server;

    public createServer(): Server;
  }

  export class Util {
    public static createUUID(): string;
    public static verifyYoutubeURL(url: string): Boolean;
  }

  //#endregion
}