import { TipoContaBancaria } from "src/enums/tipo-conta-bancaria.enum";
import { ContaBancaria } from "./conta-bancaria.model";

export class ContaPoupanca extends ContaBancaria {
    taxaJuros: number;

    constructor(saldo: number, taxaJuros: number) {
        super(saldo, TipoContaBancaria.POUPANCA);
        this.taxaJuros = taxaJuros;
    }

    calcularTaxa(): number {
        return this.saldo * (this.taxaJuros / 100);
    }
}