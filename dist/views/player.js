'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, req, res) => {
    if (client.nodes.has(req.params.uuid)) {
        return client.nodes.get(req.params.uuid)
            .createPlayer(res).play(req.query.type);
    }
    else {
        return res.status(400).json({
            message: 'Node not found',
        });
    }
    ;
};
