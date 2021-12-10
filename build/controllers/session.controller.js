"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionHandler = void 0;
const services_1 = require("../services");
async function createSessionHandler(req, res) {
    const user = (await (0, services_1.validatePassword)(req.body));
    if (!user)
        res.status(401).send("Invalid Email or Password");
    const session = await (0, services_1.createSession)(user._id, req.get("user-agent") || "");
}
exports.createSessionHandler = createSessionHandler;
//# sourceMappingURL=session.controller.js.map