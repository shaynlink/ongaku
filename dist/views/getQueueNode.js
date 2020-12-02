'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, req, res) => {
    if (client.nodes.has(req.params.uuid)) {
        return res.status(200).json({
            queue: client.nodes.get(req.params.uuid).toJSON().queue,
        });
    }
    else {
        return res.status(400).json({
            error: true,
            message: 'Node not found',
        });
    }
    ;
};
