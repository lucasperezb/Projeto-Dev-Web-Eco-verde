import * as mongoose from 'mongoose';
export declare const CompraSchema: any;
export interface Compra extends mongoose.Document {
    email: string;
    itens: Array<{
        nome: string;
        quantidade: number;
        preco: number;
    }>;
    total: number;
    dataCompra: Date;
}
