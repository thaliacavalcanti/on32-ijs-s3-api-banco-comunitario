import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TipoContaBancaria } from 'src/enums/tipo-conta-bancaria.enum';
import { Cliente } from 'src/models/cliente.model';
import { ContaCorrente } from 'src/models/conta-corrente.model';
import { ContaPoupanca } from 'src/models/conta-poupanca.model';
import { BancoDeDados } from '../db/banco-de-dados';

@Injectable()
export class ClienteService {
  constructor(private readonly bancoDeDados: BancoDeDados) {}

  criarCliente({ nomeCompleto, endereco, telefone }: Cliente): Cliente {
    const cliente = new Cliente(nomeCompleto, endereco, randomUUID(), telefone);
    this.bancoDeDados.cadastrarCliente(cliente);
    return cliente;
  }

  abrirContaParaCliente(
    clienteId: string,
    saldo: number,
    tipoConta: TipoContaBancaria,
  ): void {
    const cliente = this.bancoDeDados.encontrarClientePorId(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }

    if (tipoConta === TipoContaBancaria.CORRENTE) {
      cliente.abrirConta(new ContaCorrente(saldo, 100));
    } else if (tipoConta === TipoContaBancaria.POUPANCA) {
      cliente.abrirConta(new ContaPoupanca(saldo, 0));
    } else {
      throw new Error('Tipo de conta inválido.');
    }
  }

  encontrarClientePorId(clienteId: string): Cliente {
    return this.bancoDeDados.encontrarClientePorId(clienteId);
  }

  fecharConta(clienteId: string, contaId: string) {
    const cliente = this.bancoDeDados.encontrarClientePorId(clienteId);
    const conta = cliente.contas.find((conta) => conta.id === contaId);
    cliente.fecharConta(conta);
  }

  calcularTaxaDeJuros(clienteId: string): number {
    const contas = this.encontrarClientePorId(clienteId).contas || [];
    const contaPoupanca = contas.find(
      (conta) => conta.tipo === TipoContaBancaria.POUPANCA,
    );

    if (contaPoupanca instanceof ContaPoupanca) {
      return contaPoupanca.calcularTaxa();
    }
    return 0;
  }

  mudarTipoConta(clienteId: string, contaId: string) {
    const cliente = this.encontrarClientePorId(clienteId);
    const conta = cliente.contas.find((conta) => conta.id === contaId);
    const novoTipoConta =
      conta.tipo === TipoContaBancaria.CORRENTE
        ? TipoContaBancaria.POUPANCA
        : TipoContaBancaria.CORRENTE;
    cliente.mudarTipoConta(conta, novoTipoConta);
  }
}
