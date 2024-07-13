import { Injectable } from '@nestjs/common';
import { BancoDeDados } from '../db/banco-de-dados';

@Injectable()
export class TransacaoService {
  constructor(private readonly bancoDeDados: BancoDeDados) {}

  transferencia(params: {
    clienteIdOrigem: string;
    tipoContaOrigem: string;
    clienteIdDestino: string;
    tipoContaDestino: string;
    valor: number;
  }) {
    const clienteOrigem = this.bancoDeDados.encontrarClientePorId(
      params.clienteIdOrigem,
    );
    const contaOrigem = clienteOrigem.contas.find(
      (conta) => conta.tipo === params.tipoContaOrigem,
    );
    const clienteDestino = this.bancoDeDados.encontrarClientePorId(
      params.clienteIdDestino,
    );
    const contaDestino = clienteDestino.contas.find(
      (conta) => conta.tipo === params.tipoContaDestino,
    );
    contaOrigem.transferir(contaDestino, params.valor);
  }

  depositar(params: { clienteId: string; valor: number; tipoConta: string }) {
    const cliente = this.bancoDeDados.encontrarClientePorId(params.clienteId);
    const conta = cliente.contas.find(
      (conta) => conta.tipo === params.tipoConta,
    );
    conta.depositar(params.valor);
  }

  sacar(params: { clienteId: string; tipoConta: string; valor: number }) {
    const cliente = this.bancoDeDados.encontrarClientePorId(params.clienteId);
    const conta = cliente.contas.find(
      (conta) => conta.tipo === params.tipoConta,
    );
    conta.sacar(params.valor);
  }
}
