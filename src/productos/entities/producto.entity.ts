import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  sku: string;

  @Column({ length: 120 })
  nombre: string;

  @Column('decimal', { precision: 12, scale: 2, transformer: { to: (v: number) => v, from: (v: string) => Number(v) } })
  precio: number;

  @Column('int', { default: 0 })
  stock: number;

  @Column('int', { default: 0 })
  stockMinimo: number;

  @CreateDateColumn()
  creadoEn: Date;
}
