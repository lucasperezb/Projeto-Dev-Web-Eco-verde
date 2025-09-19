import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './user.model';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel('Usuario')
    private readonly usuariosModel: Model<Usuario>,
  ) {}

  // Criar novo usuário
  async create(usuario: Usuario): Promise<string> {
    const existe = await this.usuariosModel.findOne({ email: usuario.email });
    if (existe)
      throw new Error('Já existe este email cadastrado');
    
    const usuarioModel = new this.usuariosModel({
      nome: usuario.nome,
      email: usuario.email,
      datanascimento: usuario.datanascimento,
      telefone: usuario.telefone,
      endereco: usuario.endereco,
      cidade: usuario.cidade,
      estado: usuario.estado,
      cep: usuario.cep,
      genero: usuario.genero,
      senha: usuario.senha,
    });

    const result = await usuarioModel.save();
    return result.email;
  }

  async findNamePorEmail(email: string): Promise<string | null> {
    const resultado = await this.usuariosModel.findOne({ email }).select('nome').exec();
    return resultado ? resultado.nome : null;
  }


  async login(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuariosModel.findOne({ email, senha }).exec(); //consulta o email e a senha
    return usuario;
  }
  
  async findOneByEmail(email: string): Promise<Usuario | null> {
    return await this.usuariosModel.findOne({ email }).exec();
  }

  // Atualizar usuário pelo email
  async update(email: string, usuarioData: Partial<Usuario>): Promise<boolean> {
    const update = await this.usuariosModel.findOneAndUpdate(
      { email }, // busca o emial no banco de dados
      usuarioData, //atualiza com os dados novos
      { new: true } //retorna o documento atualizado
    );
    return !!update; // retorna true se encontrou e atualizou
  }

  // Deletar usuário pelo email
  async remove(email: string): Promise<boolean> {
    const deletar = await this.usuariosModel.findOneAndDelete({ email });
    return !!deletar;
  }
}
