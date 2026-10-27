import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configurarApp } from '../src/setup';

describe('Inventario (e2e)', () => {
  let app: INestApplication;
  let productoId: number;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    configurarApp(app);
    await app.init();
  });

  afterAll(() => app.close());

  it('POST /productos crea un producto', async () => {
    const res = await request(app.getHttpServer())
      .post('/productos')
      .send({ sku: 'MOU-010', nombre: 'Mouse inalámbrico', precio: 59900, stockMinimo: 3 })
      .expect(201);
    productoId = res.body.id;
    expect(res.body.stock).toBe(0);
  });

  it('POST /productos valida el cuerpo', () =>
    request(app.getHttpServer()).post('/productos').send({ sku: 'X', precio: -1 }).expect(400));

  it('el producto nuevo aparece en alertas de bajo stock', async () => {
    const res = await request(app.getHttpServer()).get('/productos/alertas/bajo-stock').expect(200);
    expect(res.body.map((p: { id: number }) => p.id)).toContain(productoId);
  });

  it('una entrada aumenta el stock', async () => {
    await request(app.getHttpServer())
      .post('/movimientos')
      .send({ productoId, tipo: 'ENTRADA', cantidad: 10 })
      .expect(201);
    const res = await request(app.getHttpServer()).get(`/productos/${productoId}`).expect(200);
    expect(res.body.stock).toBe(10);
  });

  it('una salida mayor al stock es rechazada', () =>
    request(app.getHttpServer())
      .post('/movimientos')
      .send({ productoId, tipo: 'SALIDA', cantidad: 50 })
      .expect(400));

  it('el historial registra los movimientos', async () => {
    const res = await request(app.getHttpServer()).get(`/movimientos/producto/${productoId}`).expect(200);
    expect(res.body).toHaveLength(1);
  });
});
