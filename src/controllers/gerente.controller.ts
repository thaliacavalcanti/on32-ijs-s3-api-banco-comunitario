import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Gerente } from 'src/models/gerente.model';
import { GerenteService } from 'src/services/gerente.service';

@Controller()
export class BancoController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('gerentes')
  criarGerente(@Body() gerente: Gerente): Gerente {
    return this.gerenteService.criarGerente(gerente);
  }

  @Get('gerentes/:gerenteId')
  encontrarGerentePorId(@Param('gerenteId') gerenteId: string): Gerente {
    return this.gerenteService.encontrarGerentePorId(gerenteId);
  }

  @Post('gerentes/:gerenteId/clientes/:clienteId')
  adicionarClienteAoGerente(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
  ) {
    this.gerenteService.adicionarClienteAoGerente(gerenteId, clienteId);
  }

  @Delete('gerentes/:gerenteId/clientes/:clienteId')
  removeClienteDoGerente(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
  ) {
    this.gerenteService.removeClienteDoGerente(gerenteId, clienteId);
  }
}
