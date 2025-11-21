import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ComprasService } from './compras.service';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  async registrarCompra(
    @Body()
    body: {
      email: string;
      itens: Array<{ nome: string; quantidade: number; preco: number }>;
    },
  ) {
    const { email, itens } = body;
    return this.comprasService.registrarCompra(email, itens);
  }

  @Get('usuario/:email')
  async listarComprasPorUsuario(@Param('email') email: string) {
    return this.comprasService.listarComprasPorUsuario(email);
  }

  @Get()
  async listarTodasCompras() {
    return this.comprasService.listarTodasCompras();
  }

  @Get(':id')
  async buscarCompraPorId(@Param('id') id: string) {
    return this.comprasService.buscarCompraPorId(id);
  }
}