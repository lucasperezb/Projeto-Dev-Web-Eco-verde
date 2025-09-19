import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./products.model";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async salvarOuAtualizarEstoque(nome: string, quantidade: number): Promise<Product> {
    return this.productModel.findOneAndUpdate(
      { nome },
      { quantidade },
      { new: true, upsert: true }, // cria se não existir
    ).exec();
  }

  // Listar todo o estoque
  async listarEstoque(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Remover todos os produtos (limpar estoque)
  async limparEstoque(): Promise<{ deletedCount?: number }> {
    return this.productModel.deleteMany({}).exec();
  }
}