# 📦 Inventario API — NestJS

![CI](https://github.com/SJmuelle/nestjs-inventario-api/actions/workflows/ci.yml/badge.svg)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)

API REST para gestionar el inventario de un pequeño negocio: productos, entradas y salidas de stock, y alertas de reposición.

## Funcionalidades

- CRUD de productos con SKU único y validación de datos (`class-validator`).
- Movimientos de **entrada/salida** registrados en una **transacción** junto con la actualización del stock.
- Rechazo de salidas cuando no hay stock suficiente.
- Endpoint de **alertas de bajo stock** (stock ≤ stock mínimo).
- Historial de movimientos por producto.
- Documentación Swagger en `/docs`.

## Stack

NestJS 11 · TypeORM · PostgreSQL (SQLite en memoria para desarrollo y pruebas) · Jest + Supertest · Docker

## Ejecutar

```bash
npm install
npm run start:dev          # usa SQLite en memoria
```

Con PostgreSQL:

```bash
docker compose up --build
```

API: http://localhost:3000 · Swagger: http://localhost:3000/docs

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/productos` | Crear producto |
| GET | `/productos` | Listar productos |
| GET | `/productos/:id` | Obtener producto |
| PATCH | `/productos/:id` | Actualizar producto |
| DELETE | `/productos/:id` | Eliminar producto |
| GET | `/productos/alertas/bajo-stock` | Productos por reponer |
| POST | `/movimientos` | Registrar entrada o salida |
| GET | `/movimientos/producto/:id` | Historial de un producto |

## Tests

```bash
npm test           # unitarios
npm run test:e2e   # end-to-end
```
