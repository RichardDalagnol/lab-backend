import { Request, Response } from 'express';

import { container } from 'tsyringe';
import PathogenService from '@modules/Lab/services/PathogenService';


export default class PathogenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body;

    const pathogenService = container.resolve(PathogenService);

    const pathogen = await pathogenService.save({
      nome,
      descricao,
    });

    return response.json(pathogen);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { nome, descricao, id } = request.body;

    const pathogenService = container.resolve(PathogenService);

    const pathogen = await pathogenService.update({
      nome,
      descricao,
      id,
    });

    return response.json(pathogen);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const pathogenService = container.resolve(PathogenService);
    const { filtros, tamanho, pagina } = request.query

    const pathogen = await pathogenService.list({ filtros: String(filtros), tamanho: Number(tamanho), pagina: Number(pagina) });

    return response.json(pathogen);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const pathogenService = container.resolve(PathogenService);
    const { id } = request.params

    const pathogen = await pathogenService.findById(id);

    return response.json(pathogen);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const pathogenService = container.resolve(PathogenService);
    const { id } = request.params

    const pathogen = await pathogenService.delete(id);

    return response.json(pathogen);
  }

}
