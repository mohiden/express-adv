"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.getUserSessionsHandler = exports.createUserSession = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const config_1 = __importDefault(require("config"));
async function createUserSession(req, res) {
    const user = (await (0, services_1.validatePassword)(req.body));
    if (!user)
        res.status(401).send("Invalid Email or Password");
    const session = await (0, services_1.createSession)(user._id, req.get("user-agent") || "");
    const accessToken = (0, utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), {
        expiresIn: config_1.default.get('accessTokenTtl'),
    });
    const refreshToken = (0, utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), {
        expiresIn: config_1.default.get('refreshTokenTtl'),
    }, "private");
    return res.status(200).send({ accessToken, refreshToken });
}
exports.createUserSession = createUserSession;
async function getUserSessionsHandler(_, res) {
    const userId = res.locals.user._id;
    const sessions = await (0, services_1.findSessions)({ user: userId, valid: true });
    return res.send(sessions);
}
exports.getUserSessionsHandler = getUserSessionsHandler;
async function deleteSessionHandler(_, res) {
    var _a, _b;
    const sessionId = (_b = (_a = res === null || res === void 0 ? void 0 : res.locals) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.session;
    await (0, services_1.updateSession)({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
//# sourceMappingURL=session.controller.js.map