import * as mongoose from 'mongoose';
export declare const ProductSchema: any;
export interface Product extends mongoose.Document {
    nome: string;
    quantidade: number;
}
