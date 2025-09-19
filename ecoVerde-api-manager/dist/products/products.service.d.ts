import { Product } from "./products.model";
import { Model } from "mongoose";
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    salvarOuAtualizarEstoque(nome: string, quantidade: number): Promise<Product>;
    listarEstoque(): Promise<Product[]>;
    limparEstoque(): Promise<{
        deletedCount?: number;
    }>;
}
