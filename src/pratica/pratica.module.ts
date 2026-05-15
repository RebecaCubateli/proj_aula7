import { Module } from '@nestjs/common';
import { PraticaController } from './pratica.controller';
import { PraticaService } from './pratica.service';

@Module({
  controllers: [PraticaController],
  providers: [PraticaService]
})
export class PraticaModule {}
