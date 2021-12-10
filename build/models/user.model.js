"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        console.log("HERE !!");
        return next();
    }
    const salt = await bcrypt_1.default.genSalt(config_1.default.get("saltWorkFactor"));
    const hash = await bcrypt_1.default.hash(this.password, salt);
    this.password = hash;
});
userSchema.methods.comparePassword = async function (password) {
    return bcrypt_1.default.compare(password, this.password).catch((_) => false);
};
exports.User = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user.model.js.map