"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reIssueAccessToken = exports.updateSession = exports.findSessions = exports.createSession = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
const models_1 = require("../models");
const _1 = require(".");
const config_1 = __importDefault(require("config"));
async function createSession(userId, userAgent) {
    const session = await models_1.Session.create({ user: userId, userAgent });
    return session.toJSON();
}
exports.createSession = createSession;
async function findSessions(query) {
    return models_1.Session.find(query).lean();
}
exports.findSessions = findSessions;
async function updateSession(query, update) {
    return models_1.Session.updateOne(query, update);
}
exports.updateSession = updateSession;
async function reIssueAccessToken(refreshToken) {
    const { decoded } = (0, utils_1.verifyJwt)(refreshToken, "private");
    if (!decoded && !(0, lodash_1.get)(decoded, "session")) {
        return false;
    }
    const session = await models_1.Session.findById((0, lodash_1.get)(decoded, "session"));
    if (!session || session.valid)
        false;
    const user = await (0, _1.findUser)({ _id: session === null || session === void 0 ? void 0 : session.user });
    if (!user)
        false;
    const accessToken = (0, utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session === null || session === void 0 ? void 0 : session._id }), {
        expiresIn: config_1.default.get('accessTokenTtl'),
    });
    return accessToken;
}
exports.reIssueAccessToken = reIssueAccessToken;
//# sourceMappingURL=session.service.js.map