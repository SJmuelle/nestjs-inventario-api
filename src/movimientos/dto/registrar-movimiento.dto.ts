import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { TipoMovimiento } from '../entities/movimiento.entity';

export class RegistrarMovimientoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productoId: number;

  @ApiProperty({ enum: TipoMovimiento })
  @IsEnum(TipoMovimiento)
  tipo: TipoMovimiento;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  cantidad: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  observacion?: string;
}
