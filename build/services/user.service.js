"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.validatePassword = exports.createUser = void 0;
const lodash_1 = require("lodash");
const models_1 = require("../models");
async function createUser(input) {
    try {
        const user = await models_1.User.create(input);
        return (0, lodash_1.omit)(user.toJSON(), "password");
    }
    catch (e) {
        if (e.code === 11000) {
            throw new Error("this email is taken already!");
        }
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
async function findUser(query) {
    return models_1.User.findOne(query).lean();
}
exports.findUser = findUser;
//# sourceMappingURL=user.service.js.map