"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = void 0;
const lodash_1 = require("lodash");
const services_1 = require("../services");
const utils_1 = require("../utils");
async function deserializeUser(req, res, next) {
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
    if (!accessToken)
        return next();
    const { decoded, expired } = (0, utils_1.verifyJwt)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = await (0, services_1.reIssueAccessToken)(refreshToken);
        if (!newAccessToken) {
            return next();
        }
        res.setHeader('x-access-token', newAccessToken);
        const result = (0, utils_1.verifyJwt)(newAccessToken);
        res.locals.user = result.decoded;
    }
    return next();
}
exports.deserializeUser = deserializeUser;
//# sourceMappingURL=deserializeUser.js.map