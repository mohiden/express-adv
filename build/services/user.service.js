"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.createUser = void 0;
const lodash_1 = require("lodash");
const models_1 = require("../models");
async function createUser(input) {
    try {
        const user = await models_1.User.create(input);
        return (0, lodash_1.omit)(user.toJSON(), "password");
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.createUser = createUser;
async function validatePassword({ email, password, }) {
    const user = await models_1.User.findOne({ email });
    if (!user) {
        return false;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return false;
    return (0, lodash_1.omit)(user.toJSON(), "password");
}
exports.validatePassword = validatePassword;
//# sourceMappingURL=user.service.js.map