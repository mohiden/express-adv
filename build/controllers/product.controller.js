"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.updateProductHandler = exports.findProductHandler = exports.createProductHandler = void 0;
const services_1 = require("../services");
async function createProductHandler(req, res) {
    try {
        const userId = res.locals.user._id;
        const product = await (0, services_1.createProduct)(Object.assign(Object.assign({}, req.body), { user: userId }));
        return res.send(product);
    }
    catch (e) {
        return res.status(500).send(e.toString());
    }
}
exports.createProductHandler = createProductHandler;
async function findProductHandler(req, res) {
    try {
        const productId = req.params.productId;
        const product = await (0, services_1.findProduct)({ _id: productId });
        if (!product) {
            return res.sendStatus(404);
        }
        return res.send(product);
    }
    catch (e) {
        return res.status(500).send(e.toString());
    }
}
exports.findProductHandler = findProductHandler;
async function updateProductHandler(req, res) {
    console.log("UPDATE SHIT");
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const update = req.body;
        const product = await (0, services_1.findProduct)({ _id: productId });
        if (!product) {
            return res.sendStatus(404);
        }
        if (product.user.toString() !== userId) {
            console.log("PS:", product.user);
            console.log("S:", userId);
            return res.sendStatus(403);
        }
        const updatedProduct = await (0, services_1.updateProduct)({ _id: product._id }, update, { new: true });
        return res.send(updatedProduct);
    }
    catch (e) {
        return res.status(500).send(e.toString());
    }
}
exports.updateProductHandler = updateProductHandler;
async function deleteProductHandler(req, res) {
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = await (0, services_1.findProduct)({ _id: productId });
        if (!product) {
            return res.sendStatus(404);
        }
        if (product.user.toString() !== userId) {
            return res.sendStatus(403);
        }
        await (0, services_1.deleteProduct)({ _id: product._id });
        return res.send(true);
    }
    catch (e) {
        return res.status(500).send(e.toString());
    }
}
exports.deleteProductHandler = deleteProductHandler;
//# sourceMappingURL=product.controller.js.map