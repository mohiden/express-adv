"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
        return;
    }
    catch (e) {
        return res.status(400).send(e.errors);
    }
};
exports.validate = validate;
//# sourceMappingURL=validateResource.js.map