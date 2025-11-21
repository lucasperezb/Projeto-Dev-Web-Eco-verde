"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    quantidade: { type: Number, required: true },
}, { collection: 'products' });
//# sourceMappingURL=products.model.js.map