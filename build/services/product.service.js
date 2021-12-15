"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.findProduct = exports.createProduct = void 0;
const models_1 = require("../models");
async function createProduct(input) {
    return models_1.Product.create(input);
}
exports.createProduct = createProduct;
async function findProduct(query, options = { lean: true }) {
    return models_1.Product.findOne(query, {}, options);
}
exports.findProduct = findProduct;
async function updateProduct(query, update, options) {
    return models_1.Product.findOneAndUpdate(query, update, options);
}
exports.updateProduct = updateProduct;
async function deleteProduct(query) {
    return models_1.Product.findOneAndDelete(query);
}
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.service.js.map