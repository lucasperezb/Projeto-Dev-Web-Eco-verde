import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  quantidade: { type: Number, required: true },
},{ collection: 'products'})

export interface Product extends mongoose.Document {
  nome: string;
  quantidade: number;
}