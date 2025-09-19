import { ProductsService } from "./products.service";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    listarEstoque(): Promise<import("./products.model").Product[]>;
    salvarOuAtualizarEstoque(body: {
        nome: string;
        quantidade: number;
    }): Promise<import("./products.model").Product>;
    limparEstoque(): Promise<{
        deletedCount?: number;
    }>;
}
