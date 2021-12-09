"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const utils_1 = require("../utils");
async function connect() {
    const dbUri = config_1.default.get("dbUri");
    try {
        await mongoose_1.default.connect(dbUri);
        utils_1.log.info("DB connected");
    }
    catch (e) {
        utils_1.log.error(e || "couldn't connect to DB");
        process.exit(1);
    }
}
exports.connect = connect;
//# sourceMappingURL=connect.js.map