import { Module } from '@nestjs/common';
import { BancoController } from './controllers/banco.controller';
import { BancoService } from './services/banco.service';

@Module({
  imports: [],
  controllers: [BancoController],
  providers: [BancoService],
})
export class AppModule {}
