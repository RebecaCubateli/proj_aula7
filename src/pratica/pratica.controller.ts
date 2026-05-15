// import { Controller } from '@nestjs/common';

// @Controller('pratica')
// export class PraticaController {}
import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';

import { PraticaService } from './pratica.service';
import { Pratica } from './pratica.model';

@Controller()
export class PraticaController {

  constructor(
    private readonly praticaService: PraticaService
  ) {}

  @Post('pratica')
  cadastrar(
    @Body() pratica: Pratica
  ) {
    return this.praticaService.cadastrar(pratica);
  }

  @Get('historico')
  listar(
    @Query('nomeUsuario') nomeUsuario?: string,
    @Query('tipo') tipo?: string,
    @Query('dataInicial') dataInicial?: string,
    @Query('dataFinal') dataFinal?: string,
  ) {

    return this.praticaService.listar(
      nomeUsuario,
      tipo,
      dataInicial,
      dataFinal
    );
  }

  @Get('estatisticas')
  estatisticas() {
    return this.praticaService.estatisticas();
  }

}