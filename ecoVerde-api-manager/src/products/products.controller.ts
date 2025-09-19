import { Body, Controller, Get, Post, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async listarEstoque() {
    return this.productsService.listarEstoque();
  }

  @Post()
  async salvarOuAtualizarEstoque(
    @Body() body: { nome: string; quantidade: number },
  ) {
    const { nome, quantidade } = body;
    return this.productsService.salvarOuAtualizarEstoque(nome, quantidade);
  }

  @Delete()
  async limparEstoque() {
    return this.productsService.limparEstoque();
  }

}