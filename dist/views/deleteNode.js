'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, req, res) => {
    if (client.nodes.has(req.params.uuid)) {
        client.nodes.get(req.params.uuid).delete();
    }
    else {
        return res.status(400).json({
            error: true,
            message: 'Cannot delete this node',
        });
    }
    ;
    return res.status(204).json({ message: 'ok' });
};
