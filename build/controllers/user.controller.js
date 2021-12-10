"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
async function createUserHandler(req, res) {
    try {
        const user = await (0, services_1.createUser)(req.body);
        return res.send(user);
    }
    catch (e) {
        utils_1.log.error(e.message);
        return res.status(409).send(e.message);
    }
}
exports.createUserHandler = createUserHandler;
//# sourceMappingURL=user.controller.js.map