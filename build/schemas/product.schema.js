"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.findProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required"
        }),
        description: (0, zod_1.string)().min(100, "Description should be min 100 chars"),
        price: (0, zod_1.number)({
            required_error: "Price is required"
        }),
        image: (0, zod_1.string)({
            required_error: "Image is required"
        })
    })
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: "ProductId is required"
        })
    })
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.findProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
//# sourceMappingURL=product.schema.js.map