import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TipoContaBancaria } from 'src/enums/tipo-conta-bancaria.enum';
import { Cliente } from 'src/models/cliente.model';
import { ClienteService } from 'src/services/cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  criarCliente(@Body() cliente: Cliente): Cliente {
    return this.clienteService.criarCliente(cliente);
  }

  @Get(':clienteId')
  encontrarClientePorId(
    @Param('clienteId') clienteId: string,
  ): Partial<Cliente> {
    return this.clienteService.encontrarClientePorId(clienteId);
  }

  @Post(':clienteId/contas')
  abrirContaParaCliente(
    @Param('clienteId') clienteId: string,
    @Body() body: { saldo: number; tipoConta: string },
  ) {
    const { saldo, tipoConta } = body;
    const _tipoConta =
      tipoConta === TipoContaBancaria.CORRENTE
        ? TipoContaBancaria.CORRENTE
        : TipoContaBancaria.POUPANCA;
    this.clienteService.abrirContaParaCliente(clienteId, saldo, _tipoConta);
  }

  @Delete(':clienteId/contas/:contaId')
  fecharContaCliente(
    @Param('clienteId') clienteId: string,
    @Param('contaId') contaId: string,
  ): void {
    this.clienteService.fecharConta(clienteId, contaId);
  }
}
