import { TipoContaBancaria } from "src/enums/tipo-conta-bancaria.enum";
import { Cliente } from "./cliente.model";
import { ContaBancaria } from "./conta-bancaria.model";
import { ContaCorrente } from "./conta-corrente.model";
import { ContaPoupanca } from "./conta-poupanca.model";

export class Gerente {
    constructor(
        public nomeCompleto: string,
        public id: string,
        public clientes: Cliente[] = []
    ) {     }

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
      }

      removerCliente(cliente: Cliente): void {
        const index = this.clientes.indexOf(cliente);
        if (index !== -1) {
          this.clientes.splice(index, 1);
        }
      }

      abrirConta(saldoInicial: 0, cliente: Cliente, tipoConta: TipoContaBancaria): void {
        if (tipoConta === TipoContaBancaria.CORRENTE) {
          cliente.abrirConta(new ContaCorrente(saldoInicial, 100)); // Exemplo de limite do cheque especial: 100
        } else if (tipoConta === TipoContaBancaria.POUPANCA) {
          cliente.abrirConta(new ContaPoupanca(saldoInicial, 0)); // Exemplo de conta poupança sem taxa inicial
        } else {
          throw new Error('Tipo de conta inválido.');
        }
      }

    fecharConta(cliente: Cliente, conta: ContaBancaria): void {
        cliente.fecharConta(conta);
    }

    mudarTipoConta(cliente: Cliente, conta: ContaBancaria, novoTipo: TipoContaBancaria): void {
        cliente.mudarTipoConta(conta, novoTipo);
    }
}