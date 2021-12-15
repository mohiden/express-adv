"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const controllers_1 = require("./controllers");
const schemas_1 = require("./schemas");
const controllers_2 = require("./controllers");
function routes(app) {
    app.get("/healthcheck", (_, res) => {
        res.sendStatus(200);
    });
    app.post("/api/user", (0, middleware_1.validate)(schemas_1.createUserSchema), controllers_1.createUserHandler);
    app.post("/api/session", (0, middleware_1.validate)(schemas_1.createUserSessionSchema), controllers_1.createUserSession);
    app.get('/api/session', middleware_1.requireUser, controllers_1.getUserSessionsHandler);
    app.delete('/api/session', middleware_1.requireUser, controllers_1.deleteSessionHandler);
    app.post('/api/product', [(0, middleware_1.validate)(schemas_1.createProductSchema), middleware_1.requireUser], controllers_2.createProductHandler);
    app.get('/api/product/:productId', (0, middleware_1.validate)(schemas_1.findProductSchema), controllers_2.findProductHandler);
    app.put('/api/product/:productId', [(0, middleware_1.validate)(schemas_1.updateProductSchema), middleware_1.requireUser], controllers_2.updateProductHandler);
    app.delete('/api/product/:productId', [(0, middleware_1.validate)(schemas_1.deleteProductSchema), middleware_1.requireUser], controllers_1.deleteProductHandler);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map