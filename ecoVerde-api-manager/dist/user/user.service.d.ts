import { Model } from 'mongoose';
import { Usuario } from './user.model';
export declare class UsuariosService {
    private readonly usuariosModel;
    constructor(usuariosModel: Model<Usuario>);
    create(usuario: Usuario): Promise<string>;
    findNamePorEmail(email: string): Promise<string | null>;
    login(email: string, senha: string): Promise<Usuario | null>;
    findOneByEmail(email: string): Promise<Usuario | null>;
    update(email: string, usuarioData: Partial<Usuario>): Promise<boolean>;
    remove(email: string): Promise<boolean>;
}
