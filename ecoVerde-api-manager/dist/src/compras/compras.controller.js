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
exports.ComprasController = void 0;
const common_1 = require("@nestjs/common");
const compras_service_1 = require("./compras.service");
let ComprasController = class ComprasController {
    constructor(comprasService) {
        this.comprasService = comprasService;
    }
    async registrarCompra(body) {
        const { email, itens } = body;
        return this.comprasService.registrarCompra(email, itens);
    }
    async listarComprasPorUsuario(email) {
        return this.comprasService.listarComprasPorUsuario(email);
    }
    async listarTodasCompras() {
        return this.comprasService.listarTodasCompras();
    }
    async buscarCompraPorId(id) {
        return this.comprasService.buscarCompraPorId(id);
    }
};
exports.ComprasController = ComprasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "registrarCompra", null);
__decorate([
    (0, common_1.Get)('usuario/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "listarComprasPorUsuario", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "listarTodasCompras", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "buscarCompraPorId", null);
exports.ComprasController = ComprasController = __decorate([
    (0, common_1.Controller)('compras'),
    __metadata("design:paramtypes", [compras_service_1.ComprasService])
], ComprasController);
//# sourceMappingURL=compras.controller.js.map