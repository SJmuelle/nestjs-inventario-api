import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { RegistrarMovimientoDto } from './dto/registrar-movimiento.dto';
import { Movimiento, TipoMovimiento } from './entities/movimiento.entity';

@Injectable()
export class MovimientosService {
  constructor(private readonly dataSource: DataSource) {}

  /** Registra el movimiento y actualiza el stock en una sola transacción. */
  registrar(dto: RegistrarMovimientoDto): Promise<Movimiento> {
    return this.dataSource.transaction(async (manager) => {
      const producto = await manager.findOneBy(Producto, { id: dto.productoId });
      if (!producto) throw new NotFoundException(`Producto ${dto.productoId} no encontrado`);

      const delta = dto.tipo === TipoMovimiento.ENTRADA ? dto.cantidad : -dto.cantidad;
      if (producto.stock + delta < 0) {
        throw new BadRequestException(
          `Stock insuficiente: disponible ${producto.stock}, solicitado ${dto.cantidad}`,
        );
      }
      producto.stock += delta;
      await manager.save(producto);

      const movimiento = manager.create(Movimiento, {
        producto,
        tipo: dto.tipo,
        cantidad: dto.cantidad,
        observacion: dto.observacion,
      });
      return manager.save(movimiento);
    });
  }

  historial(productoId: number): Promise<Movimiento[]> {
    return this.dataSource.getRepository(Movimiento).find({
      where: { producto: { id: productoId } },
      order: { fecha: 'DESC', id: 'DESC' },
    });
  }
}
