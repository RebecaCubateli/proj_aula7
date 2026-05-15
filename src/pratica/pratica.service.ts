// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class PraticaService {}

import { Injectable } from '@nestjs/common';
import { Pratica } from './pratica.model';

@Injectable()
export class PraticaService {

  private praticas: Pratica[] = [];

  cadastrar(pratica: Pratica) {
    this.praticas.push(pratica);

    return {
      mensagem: 'Prática cadastrada com sucesso!',
      pratica,
    };
  }

  listar(
    nomeUsuario?: string,
    tipo?: string,
    dataInicial?: string,
    dataFinal?: string,
  ) {

    let resultado = this.praticas;

    if (nomeUsuario) {
      resultado = resultado.filter(
        p => p.nomeUsuario === nomeUsuario
      );
    }

    if (tipo) {
      resultado = resultado.filter(
        p => p.tipo === tipo
      );
    }

    if (dataInicial && dataFinal) {
      resultado = resultado.filter(
        p =>
          p.data >= dataInicial &&
          p.data <= dataFinal
      );
    }

    return resultado;
  }

    estatisticas() {

    const totalPraticas = this.praticas.length;

    if (totalPraticas === 0) {
        return {
        mensagem: 'Nenhuma prática cadastrada'
        };
    }

    const tipos = {};
    const usuarios = {};

    this.praticas.forEach(p => {

        tipos[p.tipo] =
        (tipos[p.tipo] || 0) + 1;

        usuarios[p.nomeUsuario] =
        (usuarios[p.nomeUsuario] || 0) + 1;

    });

    const praticaMaisComum =
        Object.keys(tipos)
        .reduce((a,b)=>
        tipos[a] > tipos[b] ? a : b);

    const usuarioMaisAtivo =
        Object.keys(usuarios)
        .reduce((a,b)=>
        usuarios[a] > usuarios[b] ? a : b);

    const hoje = new Date();

    const ultimos30Dias =
        this.praticas.filter(p=>{

        const dataPratica =
            new Date(p.data);

        const diferenca =
        (hoje.getTime()
        -dataPratica.getTime())
        /(1000*60*60*24);

        return diferenca <=30;

        });

    const mediaDiaria =
        ultimos30Dias.length/30;

    return {

        tipoMaisRegistrado:
        praticaMaisComum,

        usuarioMaisAtivo:
        usuarioMaisAtivo,

        totalPorTipo:
        tipos,

        totalPraticas,

        mediaDiariaUltimos30Dias:
        mediaDiaria.toFixed(2)

    };

    }
}
