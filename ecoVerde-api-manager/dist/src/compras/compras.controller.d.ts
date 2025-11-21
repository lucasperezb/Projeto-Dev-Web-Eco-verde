import { ComprasService } from './compras.service';
export declare class ComprasController {
    private readonly comprasService;
    constructor(comprasService: ComprasService);
    registrarCompra(body: {
        email: string;
        itens: Array<{
            nome: string;
            quantidade: number;
            preco: number;
        }>;
    }): Promise<any>;
    listarComprasPorUsuario(email: string): Promise<any>;
    listarTodasCompras(): Promise<any>;
    buscarCompraPorId(id: string): Promise<any>;
}
