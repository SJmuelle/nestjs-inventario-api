import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductosService } from './productos.service';

describe('ProductosService', () => {
  let service: ProductosService;
  const repo = {
    exists: jest.fn(),
    create: jest.fn((dto) => dto),
    save: jest.fn(async (p) => ({ id: 1, stock: 0, ...p })),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [ProductosService, { provide: getRepositoryToken(Producto), useValue: repo }],
    }).compile();
    service = moduleRef.get(ProductosService);
  });

  it('crea un producto nuevo', async () => {
    repo.exists.mockResolvedValue(false);
    const p = await service.crear({ sku: 'TEC-001', nombre: 'Teclado', precio: 100, stockMinimo: 2 });
    expect(p.id).toBe(1);
    expect(repo.save).toHaveBeenCalled();
  });

  it('rechaza SKU duplicado', async () => {
    repo.exists.mockResolvedValue(true);
    await expect(
      service.crear({ sku: 'TEC-001', nombre: 'Teclado', precio: 100, stockMinimo: 0 }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('lanza NotFound si el producto no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.obtener(99)).rejects.toBeInstanceOf(NotFoundException);
  });
});
