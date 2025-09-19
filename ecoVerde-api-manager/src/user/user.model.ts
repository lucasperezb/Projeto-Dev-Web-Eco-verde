// importar o pacote mongoose
import * as mongoose from 'mongoose';

// definir o schema
export const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    datanascimento: { type: Date },
    telefone: { type: String },
    endereco: { type: String },
    cidade: { type: String },
    estado: { type: String },
    cep: { type: String },
    genero: { type: String },
    senha: { type: String, required: true }
}, { collection: 'usuarios' }); // nome da coleção no MongoDB

// interface - garantir a tipagem ao manipular os documentos
export interface Usuario extends mongoose.Document {
  id: string;
  nome: string;
  email: string;
  datanascimento: Date;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  genero: string;
  senha: string;
}
