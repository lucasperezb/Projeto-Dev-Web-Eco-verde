"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompraSchema = void 0;
const mongoose = require("mongoose");
exports.CompraSchema = new mongoose.Schema({
    email: { type: String, required: true },
    itens: {
        type: [
            {
                nome: { type: String, required: true },
                quantidade: { type: Number, required: true },
                preco: { type: Number, required: true }
            }
        ],
        required: true
    },
    total: { type: Number, required: true },
    dataCompra: { type: Date, default: Date.now }
}, { collection: 'compras' });
//# sourceMappingURL=compras.model.js.map