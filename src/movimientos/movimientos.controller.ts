import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegistrarMovimientoDto } from './dto/registrar-movimiento.dto';
import { MovimientosService } from './movimientos.service';

@ApiTags('movimientos')
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly service: MovimientosService) {}

  @Post()
  registrar(@Body() dto: RegistrarMovimientoDto) {
    return this.service.registrar(dto);
  }

  @Get('producto/:id')
  historial(@Param('id', ParseIntPipe) id: number) {
    return this.service.historial(id);
  }
}
