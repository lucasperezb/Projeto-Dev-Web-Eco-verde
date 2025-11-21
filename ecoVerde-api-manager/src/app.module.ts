import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { ComprasModule } from './compras/compras.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dados'),
    UsuariosModule, 
    ProductsModule,
    ComprasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
