'use strict';

import Client from './../Client/Client';

export default (client: Client, req: any, res: any): any => {
  if (client.nodes.has(req.params.uuid)) {
    return res.status(200).json(client.nodes.get(req.params.uuid).toJSON());
  } else {
    return res.status(400).json({
      message: 'Node not found',
    });
  };
};
