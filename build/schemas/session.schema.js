"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSessionSchema = void 0;
const zod_1 = require("zod");
exports.createUserSessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email is required"
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required"
        })
    })
});
//# sourceMappingURL=session.schema.js.map