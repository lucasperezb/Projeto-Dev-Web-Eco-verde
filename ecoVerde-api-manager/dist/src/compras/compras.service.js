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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComprasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ComprasService = class ComprasService {
    constructor(compraModel) {
        this.compraModel = compraModel;
    }
    async registrarCompra(email, itens) {
        const total = itens.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
        const novaCompra = new this.compraModel({
            email,
            itens,
            total,
            dataCompra: new Date(),
        });
        return await novaCompra.save();
    }
    async listarComprasPorUsuario(email) {
        return await this.compraModel
            .find({ email })
            .sort({ dataCompra: -1 })
            .exec();
    }
    async listarTodasCompras() {
        return await this.compraModel
            .find()
            .sort({ dataCompra: -1 })
            .exec();
    }
    async buscarCompraPorId(id) {
        return await this.compraModel.findById(id).exec();
    }
};
exports.ComprasService = ComprasService;
exports.ComprasService = ComprasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Compra')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ComprasService);
//# sourceMappingURL=compras.service.js.map