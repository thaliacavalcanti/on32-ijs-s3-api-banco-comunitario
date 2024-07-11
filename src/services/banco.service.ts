import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TipoContaBancaria } from 'src/enums/tipo-conta-bancaria.enum';
import { Cliente } from 'src/models/cliente.model';
import { ContaCorrente } from 'src/models/conta-corrente.model';
import { ContaPoupanca } from 'src/models/conta-poupanca.model';
import { Gerente } from 'src/models/gerente.model';

@Injectable()
export class BancoService {
  private gerentes: Gerente[] = [];
  private clientes: Cliente[] = [];

  criarGerente({ nomeCompleto }: Gerente): Gerente {
    const gerente = new Gerente(nomeCompleto, randomUUID());
    this.gerentes.push(gerente);
    return gerente;
  }

  criarCliente({ nomeCompleto, endereco, telefone }: Cliente): Cliente {
    const cliente = new Cliente(nomeCompleto, endereco, randomUUID(), telefone);
    this.clientes.push(cliente);
    return cliente;
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
    return this.gerentes.find((gerente) => gerente.id === id);
  }

  encontrarClientePorId(id: string): Cliente {
    return this.clientes.find((cliente) => cliente.id === id);
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
}
