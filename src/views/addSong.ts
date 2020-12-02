'use strict';

import * as ytdl from 'ytdl-core';
import Client from './../Client/Client';

export default (client: Client, req: any, res: any): any => {
  if (client.nodes.has(req.params.uuid)) {
    if (!req.body.url &&
      !/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
          .test(req.body.url)) {
      return res.status(400).json({
        error: true,
        message: 'Bad body youtube url',
        params: {
          url: req.body.url,
          service: req.body.service,
        },
      });
    } else if (!req.body.service && req.body.service != 'youtube') {
      return res.status(400).json({
        error: true,
        message: 'Bad body service',
        params: {
          url: req.body.url,
          service: req.body.service,
        },
      });
    } else {
      return client.nodes.get(req.params.uuid).addSong(ytdl(req.body.url), {
        url: req.body.url as string,
        service: req.body.service as string,
      }).fillInfo().then((song) => {
        return res.status(200).json(song.toJSON());
      });
    };
  } else {
    return res.status(400).json({
      error: true,
      message: 'Node not found',
    });
  };
};
