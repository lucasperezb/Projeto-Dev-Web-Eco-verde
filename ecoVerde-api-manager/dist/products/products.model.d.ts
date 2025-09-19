import * as mongoose from 'mongoose';
export declare const ProductSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
}, {
    nome: string;
    quantidade: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    nome: string;
    quantidade: number;
}>, {}> & mongoose.FlatRecord<{
    nome: string;
    quantidade: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export interface Product extends mongoose.Document {
    nome: string;
    quantidade: number;
}
