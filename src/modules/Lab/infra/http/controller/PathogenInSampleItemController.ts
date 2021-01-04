import { Request, Response } from 'express';

import { container } from 'tsyringe';
import PathogenInSampleItemService from '@modules/Lab/services/PathogenInSampleItemService';


export default class PathogenInSampleItemController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { amostra_item_id, patogenos } = request.body;

    const pathogenService = container.resolve(PathogenInSampleItemService);

    const pathogen = await pathogenService.save({
      amostra_item_id,
      patogenos,
    });

    return response.json(pathogen);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { pathogensInSampleItens } = request.body;

    const pathogenService = container.resolve(PathogenInSampleItemService);

    const pathogen = await pathogenService.update(pathogensInSampleItens);

    return response.json(pathogen);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const pathogenService = container.resolve(PathogenInSampleItemService);
    const { filtros, tamanho, pagina } = request.query

    const pathogen = await pathogenService.list({ filtros: String(filtros), tamanho: Number(tamanho), pagina: Number(pagina) });

    return response.json(pathogen);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const pathogenService = container.resolve(PathogenInSampleItemService);
    const { id } = request.params

    const pathogen = await pathogenService.findById(id);

    return response.json(pathogen);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const pathogenService = container.resolve(PathogenInSampleItemService);
    const { id } = request.params

    const pathogen = await pathogenService.delete(id);

    return response.json(pathogen);
  }

}
