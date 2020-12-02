'use strict';

import Client from './../Client/Client';

export default (client: Client, req: any, res: any): any =>
  res.status(200).json({
    message: 'Welcome to Ongaku, developped by shaynlink :), stay enjoy',
  });
