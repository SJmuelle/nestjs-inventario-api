import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/** PostgreSQL si hay DATABASE_URL; SQLite en memoria para desarrollo y pruebas. */
export function databaseConfig(): TypeOrmModuleOptions {
  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    };
  }
  return { type: 'better-sqlite3', database: ':memory:', autoLoadEntities: true, synchronize: true };
}
