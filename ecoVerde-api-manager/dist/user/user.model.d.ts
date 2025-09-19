import * as mongoose from 'mongoose';
export declare const UsuarioSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
}, {
    nome: string;
    email: string;
    senha: string;
    datanascimento?: NativeDate | null | undefined;
    telefone?: string | null | undefined;
    endereco?: string | null | undefined;
    cidade?: string | null | undefined;
    estado?: string | null | undefined;
    cep?: string | null | undefined;
    genero?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    nome: string;
    email: string;
    senha: string;
    datanascimento?: NativeDate | null | undefined;
    telefone?: string | null | undefined;
    endereco?: string | null | undefined;
    cidade?: string | null | undefined;
    estado?: string | null | undefined;
    cep?: string | null | undefined;
    genero?: string | null | undefined;
}>, {}> & mongoose.FlatRecord<{
    nome: string;
    email: string;
    senha: string;
    datanascimento?: NativeDate | null | undefined;
    telefone?: string | null | undefined;
    endereco?: string | null | undefined;
    cidade?: string | null | undefined;
    estado?: string | null | undefined;
    cep?: string | null | undefined;
    genero?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
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
