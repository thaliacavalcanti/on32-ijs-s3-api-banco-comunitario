import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/models/cliente.model';
import { Gerente } from 'src/models/gerente.model';

@Injectable()
export class BancoDeDados {
  gerentes: Gerente[] = [];
  private clientes: Cliente[] = [];

  encontrarClientePorId(id: string): Cliente {
    return this.clientes.find((cliente) => cliente.id === id);
  }

  cadastrarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }
}
