'use strict';

import Client from './../Client/Client';

export default (client: Client, req: any, res: any): any => {
  if (client.nodes.has(req.params.uuid)) {
    return client.nodes.get(req.params.uuid)
        .createPlayer(res).play(req.query.type);
  } else {
    return res.status(400).json({
      message: 'Node not found',
    });
  };
};
