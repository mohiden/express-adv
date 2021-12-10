"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const models_1 = require("../models");
async function createSession(userId, userAgent) {
    const session = await models_1.Session.create({ user: userId, userAgent });
    return session.toJSON();
}
exports.createSession = createSession;
//# sourceMappingURL=session.service.js.map