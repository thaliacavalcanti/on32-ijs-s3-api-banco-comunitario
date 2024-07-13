import { Controller, Post, Body } from '@nestjs/common';
import { TransacaoService } from 'src/services/transacao.service';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post('transferencia')
  transferencia(
    @Body()
    body: {
      clienteIdOrigem: string;
      tipoContaOrigem: string;
      clienteIdDestino: string;
      tipoContaDestino: string;
      valor: number;
    },
  ) {
    this.transacaoService.transferencia({
      clienteIdOrigem: body.clienteIdOrigem,
      tipoContaOrigem: body.tipoContaOrigem,
      clienteIdDestino: body.clienteIdDestino,
      tipoContaDestino: body.tipoContaDestino,
      valor: body.valor,
    });
  }

  @Post('depositar')
  depositar(
    @Body() body: { clienteId: string; valor: number; tipoConta: string },
  ) {
    this.transacaoService.depositar({
      clienteId: body.clienteId,
      valor: body.valor,
      tipoConta: body.tipoConta,
    });
  }

  @Post('sacar')
  sacar(@Body() body: { clienteId: string; tipoConta: string; valor: number }) {
    this.transacaoService.sacar({
      clienteId: body.clienteId,
      tipoConta: body.tipoConta,
      valor: body.valor,
    });
  }
}
