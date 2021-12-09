"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const utils_1 = require("./utils");
const routes_1 = __importDefault(require("./routes"));
const port = config_1.default.get('port');
const app = (0, express_1.default)();
app.listen(port, async () => {
    utils_1.log.info("Running");
    await (0, utils_1.connect)();
    (0, routes_1.default)(app);
});
//# sourceMappingURL=app.js.map