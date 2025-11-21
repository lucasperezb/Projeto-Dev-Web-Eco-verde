import { UsuariosService } from './user.service';
import { Usuario } from './user.model';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(usuario: Usuario): Promise<{
        email: string;
    }>;
    login(body: {
        email: string;
        senha: string;
    }): Promise<{
        message: string;
        nome?: undefined;
    } | {
        message: string;
        nome: string;
    }>;
    findOneByEmail(email: string): Promise<Usuario>;
    buscarNomePorEmail(email: string): Promise<string | null>;
    update(email: string, usuario: Usuario): Promise<{
        message: string;
    }>;
    remove(email: string): Promise<{
        message: string;
    }>;
}
