'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, req, res) => {
    if (client.nodes.has(req.params.uuid)) {
        return res.status(200).json(client.nodes.get(req.params.uuid).toJSON());
    }
    else {
        return res.status(400).json({
            message: 'Node not found',
        });
    }
    ;
};
