"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsuariosService = class UsuariosService {
    usuariosModel;
    constructor(usuariosModel) {
        this.usuariosModel = usuariosModel;
    }
    async create(usuario) {
        const existe = await this.usuariosModel.findOne({ email: usuario.email });
        if (existe)
            throw new Error('Já existe este email cadastrado');
        const usuarioModel = new this.usuariosModel({
            nome: usuario.nome,
            email: usuario.email,
            datanascimento: usuario.datanascimento,
            telefone: usuario.telefone,
            endereco: usuario.endereco,
            cidade: usuario.cidade,
            estado: usuario.estado,
            cep: usuario.cep,
            genero: usuario.genero,
            senha: usuario.senha,
        });
        const result = await usuarioModel.save();
        return result.email;
    }
    async findNamePorEmail(email) {
        const resultado = await this.usuariosModel.findOne({ email }).select('nome').exec();
        return resultado ? resultado.nome : null;
    }
    async login(email, senha) {
        const usuario = await this.usuariosModel.findOne({ email, senha }).exec();
        return usuario;
    }
    async findOneByEmail(email) {
        return await this.usuariosModel.findOne({ email }).exec();
    }
    async update(email, usuarioData) {
        const update = await this.usuariosModel.findOneAndUpdate({ email }, usuarioData, { new: true });
        return !!update;
    }
    async remove(email) {
        const deletar = await this.usuariosModel.findOneAndDelete({ email });
        return !!deletar;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Usuario')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuariosService);
//# sourceMappingURL=user.service.js.map