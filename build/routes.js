"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const controllers_1 = require("./controllers");
const schemas_1 = require("./schemas");
function routes(app) {
    app.get("/healthcheck", (_, res) => {
        res.sendStatus(200);
    });
    app.post("/api/user", (0, middleware_1.validate)(schemas_1.createUserSchema), controllers_1.createUserHandler);
    app.post("/api/session", (0, middleware_1.validate)(schemas_1.createUserSessionSchema), controllers_1.createUserSession);
    app.get('/api/session', middleware_1.requireUser, controllers_1.getUserSessionsHandler);
    app.delete('/api/session', middleware_1.requireUser, controllers_1.deleteSessionHandler);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map