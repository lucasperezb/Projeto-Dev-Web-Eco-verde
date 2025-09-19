"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioSchema = void 0;
const mongoose = require("mongoose");
exports.UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    datanascimento: { type: Date },
    telefone: { type: String },
    endereco: { type: String },
    cidade: { type: String },
    estado: { type: String },
    cep: { type: String },
    genero: { type: String },
    senha: { type: String, required: true }
}, { collection: 'usuarios' });
//# sourceMappingURL=user.model.js.map