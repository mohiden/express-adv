"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const nanoid_1 = require("nanoid");
const mongoose_1 = require("mongoose");
const nanoid = (0, nanoid_1.customAlphabet)('abcdefjhijklmnopqrstuvwxyz01234567890', 10);
const schema = new mongoose_1.Schema({
    productId: {
        type: String,
        unique: true,
        required: true,
        default: () => `product_${nanoid()}`
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("Product", schema);
//# sourceMappingURL=product.model.js.map