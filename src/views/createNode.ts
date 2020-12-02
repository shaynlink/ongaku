'use strict';

import Util from './../util/Util';
import Client from './../Client/Client';

export default (client: Client, req: any, res: any): any => {
  const node = client.createNode(Util.createUUID());
  return res.status(200).json(node.toJSON());
};
