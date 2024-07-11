import { TipoContaBancaria } from 'src/enums/tipo-conta-bancaria.enum';
import { ContaBancaria } from './conta-bancaria.model';

export class ContaCorrente extends ContaBancaria {
  chequeEspecial: number;

  constructor(saldo: number, chequeEspecial: number) {
    super(saldo, TipoContaBancaria.CORRENTE);
    this.chequeEspecial = chequeEspecial;
  }
}
