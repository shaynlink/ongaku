'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("./../util/Util");
exports.default = (client, req, res) => {
    const node = client.createNode(Util_1.default.createUUID());
    return res.status(200).json(node.toJSON());
};
