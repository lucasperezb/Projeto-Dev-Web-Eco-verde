import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompraSchema } from './compras.model';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Compra', schema: CompraSchema }])
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
  exports: [ComprasService]
})
export class ComprasModule {}