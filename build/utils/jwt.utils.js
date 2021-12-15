"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const privateKey = config_1.default.get("privateKey");
const publicKey = config_1.default.get("publicKey");
function signJwt(payload, options, type) {
    return jsonwebtoken_1.default.sign(payload, type ? privateKey : publicKey, Object.assign({}, (options && options)));
}
exports.signJwt = signJwt;
function verifyJwt(token, type) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, type ? privateKey : publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (e) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: false
        };
    }
}
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.utils.js.map