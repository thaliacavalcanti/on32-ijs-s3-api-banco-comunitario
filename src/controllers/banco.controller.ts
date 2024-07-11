import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TipoContaBancaria } from 'src/enums/tipo-conta-bancaria.enum';
import { Cliente } from 'src/models/cliente.model';
import { Gerente } from 'src/models/gerente.model';
import { BancoService } from 'src/services/banco.service';

@Controller()
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}

  @Post('gerentes')
  criarGerente(@Body() gerente: Gerente): Gerente {
    return this.bancoService.criarGerente(gerente);
  }

  @Post('clientes')
  criarCliente(@Body() cliente: Cliente): Cliente {
    return this.bancoService.criarCliente(cliente);
  }

  @Get('gerentes/:gerenteId')
  encontrarGerentePorId(@Param('gerenteId') gerenteId: string): Gerente {
    return this.bancoService.encontrarGerentePorId(gerenteId);
  }

  @Get('clientes/:clienteId')
  encontrarClientePorId(
    @Param('clienteId') clienteId: string,
  ): Partial<Cliente> {
    return this.bancoService.encontrarClientePorId(clienteId);
  }

  @Post('gerentes/:gerenteId/clientes/:clienteId')
  adicionarClienteAoGerente(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
  ) {
    this.bancoService.adicionarClienteAoGerente(gerenteId, clienteId);
  }

  @Post('clientes/:clienteId/contas')
  abrirContaParaCliente(
    @Param('clienteId') clienteId: string,
    @Body() body: { saldo: number; tipoConta: string },
  ) {
    const { saldo, tipoConta } = body;
    const _tipoConta =
      tipoConta === TipoContaBancaria.CORRENTE
        ? TipoContaBancaria.CORRENTE
        : TipoContaBancaria.POUPANCA;
    this.bancoService.abrirContaParaCliente(clienteId, saldo, _tipoConta);
  }

  @Delete('clientes/:clienteId/contas/:contaId')
  fecharContaCliente(
    @Param('clienteId') clienteId: string,
    @Param('contaId') contaId: string,
  ): void {
    this.bancoService.fecharConta(clienteId, contaId);
  }
}
