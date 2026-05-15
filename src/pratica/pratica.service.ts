import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pratica } from './pratica.model';

@Injectable()
export class PraticaService {

  constructor(
    @InjectModel(Pratica.name)
    private praticaModel: Model<Pratica>,
  ) {}

  async cadastrar(pratica: Pratica) {

    const novaPratica =
      new this.praticaModel(pratica);

    await novaPratica.save();

    return {
      mensagem: 'Prática cadastrada com sucesso!',
      pratica: novaPratica,
    };
  }

  async listar(
    nomeUsuario?: string,
    tipo?: string,
    dataInicial?: string,
    dataFinal?: string,
  ) {

    const filtro: any = {};

    if (nomeUsuario) {
      filtro.nomeUsuario = nomeUsuario;
    }

    if (tipo) {
      filtro.tipo = tipo;
    }

    if (dataInicial && dataFinal) {
      filtro.data = {
        $gte: dataInicial,
        $lte: dataFinal,
      };
    }

    return await this.praticaModel.find(filtro);

  }

  async estatisticas() {

    const praticas =
      await this.praticaModel.find();

    const totalPraticas =
      praticas.length;

    if (totalPraticas === 0) {
      return {
        mensagem:
        'Nenhuma prática cadastrada'
      };
    }

    const tipos = {};
    const usuarios = {};

    praticas.forEach(p => {

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
      praticas.filter(p=>{

      const dataPratica =
      new Date(p.data);

      const diferenca =
      (hoje.getTime()
      - dataPratica.getTime())
      /(1000*60*60*24);

      return diferenca <=30;

    });

    const mediaDiaria =
      ultimos30Dias.length / 30;

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