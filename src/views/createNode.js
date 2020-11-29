'use strict';

const Util = require('./../util/Util');

module.exports = exports = (client, req, res) => {
  const node = client.createNode(Util.createUUID());
  return res.status(200).json(node.toJSON());
};
