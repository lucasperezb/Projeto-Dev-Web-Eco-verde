import { Model } from 'mongoose';
import { Compra } from './compras.model';
export declare class ComprasService {
    private readonly compraModel;
    constructor(compraModel: Model<Compra>);
    registrarCompra(email: string, itens: Array<{
        nome: string;
        quantidade: number;
        preco: number;
    }>): Promise<any>;
    listarComprasPorUsuario(email: string): Promise<any>;
    listarTodasCompras(): Promise<any>;
    buscarCompraPorId(id: string): Promise<any>;
}
