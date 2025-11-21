import * as mongoose from 'mongoose';
export declare const UsuarioSchema: any;
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
