import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Compra } from './compras.model';

@Injectable()
export class ComprasService {
  constructor(
    @InjectModel('Compra') private readonly compraModel: Model<Compra>,
  ) {}

  async registrarCompra(
    email: string,
    itens: Array<{ nome: string; quantidade: number; preco: number }>,
  ) {
    const total = itens.reduce(
      (sum, item) => sum + item.preco * item.quantidade,
      0,
    );

    const novaCompra = new this.compraModel({
      email,
      itens,
      total,
      dataCompra: new Date(),
    });

    return await novaCompra.save();
  }

  async listarComprasPorUsuario(email: string) {
    return await this.compraModel
      .find({ email })
      .sort({ dataCompra: -1 })
      .exec();
  }

  async listarTodasCompras() {
    return await this.compraModel
      .find()
      .sort({ dataCompra: -1 })
      .exec();
  }

  async buscarCompraPorId(id: string) {
    return await this.compraModel.findById(id).exec();
  }
}