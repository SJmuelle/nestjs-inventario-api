import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { MovimientosModule } from './movimientos/movimientos.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig()), ProductosModule, MovimientosModule],
})
export class AppModule {}
