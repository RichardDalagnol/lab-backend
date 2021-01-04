import { Request, Response } from 'express';

import { container } from 'tsyringe';
import SampleService from '@modules/Lab/services/SampleService';


export default class SampleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao,
      especie,
      raca,
      sexo,
      idade,
      proprietario,
      observacao,
      flagTratamento,
      flagAcondicionada,
      valor,
      flagPago,
      requisitante,
      dataRecebimento, ano, amostraItens } = request.body;

    const sampleService = container.resolve(SampleService);

    const sample = await sampleService.save({
      descricao,
      especie,
      raca,
      sexo,
      idade,
      proprietario,
      observacao,
      flagTratamento,
      flagAcondicionada,
      valor,
      flagPago,
      dataRecebimento,
      ano,
      requisitante,
      amostraItens
    });

    return response.json(sample);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { descricao,
      especie,
      raca,
      sexo,
      idade,
      proprietario,
      observacao,
      flagTratamento,
      flagAcondicionada,
      valor,
      flagPago,
      dataRecebimento, amostraItens, requisitante, id } = request.body;

    const sampleService = container.resolve(SampleService);

    const sample = await sampleService.update({
      descricao,
      especie,
      raca,
      sexo,
      idade,
      proprietario,
      observacao,
      flagTratamento,
      flagAcondicionada,
      valor,
      flagPago,
      dataRecebimento, id, amostraItens, requisitante
    });

    return response.json(sample);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const sampleService = container.resolve(SampleService);
    const { filtros, tamanho, pagina } = request.query

    const sample = await sampleService.list({ filtros: String(filtros), tamanho: Number(tamanho), pagina: Number(pagina) });

    return response.json(sample);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const sampleService = container.resolve(SampleService);
    const { id } = request.params

    const sample = await sampleService.findById(id);

    return response.json(sample);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const sampleService = container.resolve(SampleService);
    const { id } = request.params

    const sample = await sampleService.delete(id);

    return response.json(sample);
  }

}
