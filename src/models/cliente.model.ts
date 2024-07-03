import { TipoContaBancaria } from "src/enums/tipo-conta-bancaria.enum";
import { ContaBancaria } from "./conta-bancaria.model";
import { randomUUID } from "node:crypto";
import { Gerente } from "./gerente.model";

export class Cliente {
    
    constructor(
        public nomeCompleto: string,
        public endereco: string,
        public id: string,
        public telefone: string,
        public gerente: Gerente | null = null,
        public contas: ContaBancaria[] = []
    ) {
        this.id = randomUUID()
    }

    abrirConta(conta: ContaBancaria): void {
        this.contas.push(conta);
    }

    fecharConta(conta: ContaBancaria): void {
        const index = this.contas.indexOf(conta);
        if (index !== -1) {
            this.contas.splice(index, 1);
        }
    }

    mudarTipoConta(conta: ContaBancaria, novoTipo: TipoContaBancaria): void {
        conta.tipo = novoTipo;
    }
}
