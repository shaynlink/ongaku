'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * Check authorization
 * @param {Client} client - Client
 * @param {express.Request} req - Request
 * @param {express.Response} res - Response
 * @return {MiddlewareRes}
 */
function authentification(client, req, res) {
    if (!client.options.token)
        return { status: true };
    const headers = req.headers;
    if (headers.authorization == client.options.token)
        return { status: true };
    else {
        return {
            status: false,
            message: 'Bad token',
        };
    }
    ;
}
;
exports.default = authentification;
