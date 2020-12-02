'use strict';

import Client from './../Client/Client';

export default (client: Client, req: any, res: any): any => {
  if (client.nodes.has(req.params.uuid)) {
    return res.status(200).json({
      queue: client.nodes.get(req.params.uuid).toJSON().queue,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: 'Node not found',
    });
  };
};
