import { TipoContaBancaria } from 'src/enums/tipo-conta-bancaria.enum';
import { randomUUID } from 'node:crypto';
export class ContaBancaria {
  saldo: number;
  tipo: TipoContaBancaria;
  id: string;

  constructor(saldo: number, tipo: TipoContaBancaria) {
    this.id = randomUUID();
    this.saldo = saldo;
    this.tipo = tipo;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): void {
    if (valor <= this.saldo) {
      this.saldo -= valor;
    } else {
      throw new Error('Saldo insuficiente');
    }
  }

  verificarSaldo(): number {
    return this.saldo;
  }

  transferir(destino: ContaBancaria, valor: number): void {
    if (valor <= this.saldo) {
      this.sacar(valor);
      destino.depositar(valor);
    } else {
      throw new Error('Saldo insuficiente para transferência.');
    }
  }
}
