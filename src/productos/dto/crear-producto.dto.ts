import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CrearProductoDto {
  @ApiProperty({ example: 'TEC-001' })
  @IsString()
  @Length(3, 30)
  sku: string;

  @ApiProperty({ example: 'Teclado mecánico' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 189900 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;

  @ApiProperty({ example: 5, required: false })
  @IsInt()
  @Min(0)
  stockMinimo: number = 0;
}
