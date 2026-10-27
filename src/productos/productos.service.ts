import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(@InjectRepository(Producto) private readonly repo: Repository<Producto>) {}

  async crear(dto: CrearProductoDto): Promise<Producto> {
    if (await this.repo.exists({ where: { sku: dto.sku } })) {
      throw new ConflictException(`Ya existe un producto con SKU ${dto.sku}`);
    }
    return this.repo.save(this.repo.create(dto));
  }

  listar(): Promise<Producto[]> {
    return this.repo.find({ order: { nombre: 'ASC' } });
  }

  async obtener(id: number): Promise<Producto> {
    const producto = await this.repo.findOneBy({ id });
    if (!producto) throw new NotFoundException(`Producto ${id} no encontrado`);
    return producto;
  }

  async actualizar(id: number, dto: ActualizarProductoDto): Promise<Producto> {
    const producto = await this.obtener(id);
    return this.repo.save(Object.assign(producto, dto));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.remove(await this.obtener(id));
  }

  /** Productos cuyo stock está en o por debajo del mínimo. */
  bajoStock(): Promise<Producto[]> {
    return this.repo.find({ where: { stock: Raw((col) => `${col} <= "stockMinimo"`) } });
  }
}
