import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TipoContaBancaria } from 'src/enums/tipo-conta-bancaria.enum';
import { Cliente } from 'src/models/cliente.model';
import { ContaCorrente } from 'src/models/conta-corrente.model';
import { ContaPoupanca } from 'src/models/conta-poupanca.model';
import { Gerente } from 'src/models/gerente.model';
import { BancoDeDados } from '../db/banco-de-dados';

@Injectable()
export class GerenteService {
  constructor(private readonly bancoDeDados: BancoDeDados) {}

  criarGerente({ nomeCompleto }: Gerente): Gerente {
    const gerente = new Gerente(nomeCompleto, randomUUID());
    this.bancoDeDados.cadastrarGerente(gerente);
    return gerente;
  }

  adicionarClienteAoGerente(gerenteId: string, clienteId: string): void {
    const gerente = this.encontrarGerentePorId(gerenteId);

    if (!gerente) throw new Error('Gerente não encontrado.');

    const cliente = this.encontrarClientePorId(clienteId);

    if (!cliente) throw new Error('Cliente não encontrado.');

    gerente.adicionarCliente(cliente);
    cliente.gerente = gerente;
  }

  encontrarGerentePorId(id: string): Gerente {
    return this.bancoDeDados.encontrarGerentePorId(id);
  }

  encontrarClientePorId(id: string): Cliente {
    return this.bancoDeDados.encontrarClientePorId(id);
  }

  abrirContaParaCliente(
    clienteId: string,
    saldo: number,
    tipoConta: TipoContaBancaria,
  ): void {
    const cliente = this.encontrarClientePorId(clienteId);
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

  fecharConta(clienteId: string, contaId: string) {
    const cliente = this.encontrarClientePorId(clienteId);
    const conta = cliente.contas.find((conta) => conta.id === contaId);
    cliente.fecharConta(conta);
  }

  removeClienteDoGerente(gerenteId: string, clienteId: string): void {
    const cliente = this.encontrarClientePorId(clienteId);
    const gerente = this.encontrarGerentePorId(gerenteId);
    gerente.removerCliente(cliente);
  }
}
