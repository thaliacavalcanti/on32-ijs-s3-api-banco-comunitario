import { Module } from '@nestjs/common';
import { BancoController } from './controllers/gerente.controller';
import { ClienteController } from './controllers/cliente.controller';
import { BancoDeDados } from './db/banco-de-dados';
import { ClienteService } from './services/cliente.service';
import { GerenteService } from './services/gerente.service';
import { TransacaoService } from './services/transacao.service';
import { TransacaoController } from './controllers/transacao.controller';

@Module({
  imports: [],
  controllers: [BancoController, ClienteController, TransacaoController],
  providers: [GerenteService, ClienteService, BancoDeDados, TransacaoService],
})
export class AppModule {}
