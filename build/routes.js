"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function routes(app) {
    app.get("/healthcheck", (_, res) => {
        res.sendStatus(200);
    });
}
exports.default = routes;
//# sourceMappingURL=routes.js.map