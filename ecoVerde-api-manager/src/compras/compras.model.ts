import * as mongoose from 'mongoose';

export const CompraSchema = new mongoose.Schema({
  email: { type: String, required: true },
  itens: { 
    type: [
      {
        nome: { type: String, required: true },
        quantidade: { type: Number, required: true },
        preco: { type: Number, required: true }
      }
    ], 
    required: true 
  },
  total: { type: Number, required: true },
  dataCompra: { type: Date, default: Date.now }
}, { collection: 'compras' });

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