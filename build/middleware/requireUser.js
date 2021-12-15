"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const requireUser = (_, res, next) => {
    const user = res.locals.user;
    if (!user)
        res.status(403).send("unauthorized");
    return next();
};
exports.requireUser = requireUser;
//# sourceMappingURL=requireUser.js.map