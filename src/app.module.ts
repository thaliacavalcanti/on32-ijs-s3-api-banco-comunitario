import { Module } from '@nestjs/common';
import { BancoController } from './controllers/gerente.controller';
import { ClienteController } from './controllers/cliente.controller';
import { BancoDeDados } from './db/banco-de-dados';
import { ClienteService } from './services/cliente.service';
import { GerenteService } from './services/gerente.service';

@Module({
  imports: [],
  controllers: [BancoController, ClienteController],
  providers: [GerenteService, ClienteService, BancoDeDados],
})
export class AppModule {}
