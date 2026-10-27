import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

export enum TipoMovimiento {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
}

@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Producto, { onDelete: 'CASCADE', eager: true })
  producto: Producto;

  @Column({ type: 'varchar', length: 10 })
  tipo: TipoMovimiento;

  @Column('int')
  cantidad: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  observacion?: string;

  @CreateDateColumn()
  fecha: Date;
}
