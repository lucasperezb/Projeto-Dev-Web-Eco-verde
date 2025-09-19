import { Controller, Body, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { UsuariosService } from './user.service';
import { Usuario } from './user.model';

@Controller('usuarios') // rota base
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() usuario: Usuario): Promise<{ email: string }> {
    const resp = await this.usuariosService.create(usuario);
    return { email: resp };
  }

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const usuario = await this.usuariosService.login(body.email, body.senha);
    if (!usuario) {
      return { message: 'Credenciais inválidas' };
    }
    return {
      message: 'Login realizado com sucesso',
      nome: usuario.nome,
    };
  }
 
  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    return this.usuariosService.findOneByEmail(email);
  }

  @Get('buscarnome/:email')
  async buscarNomePorEmail(@Param('email') email: string): Promise<string | null> {
    return this.usuariosService.findNamePorEmail(email);
  }

  @Put(':email')
  async update(@Param('email') email: string,@Body() usuario: Usuario): Promise<{ message: string }> {
    const update = await this.usuariosService.update(email, usuario);
    if (update)
      return { message: 'Usuário alterado com sucesso' };
    else
      return { message: 'Usuário não encontrado' };
  }

  @Delete(':email')
  async remove(@Param('email') email: string): Promise<{ message: string }> {
    const deleted = await this.usuariosService.remove(email);
    if (deleted)
      return { message: 'Usuário excluído com sucesso' };
    else
      return { message: 'Usuário não encontrado' };
  }
}
