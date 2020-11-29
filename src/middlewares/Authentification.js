'use strict';

/**
 * Check authorization
 * @param {Client} client - Client
 * @param {express.Request} req - Request
 * @param {express.Response} res - Response
 * @return {MiddlewareRes}
 */
function authentification(client, req, res) {
  if (!client.options.token) return {status: true};
  if (req.headers.authorization == client.options.token) return {status: true};
  else {
    return {
      status: false,
      message: 'Bad token',
    };
  };
};

module.exports = exports = authentification;
