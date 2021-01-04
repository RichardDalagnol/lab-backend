import { Request, Response } from 'express';

import { container } from 'tsyringe';
import AntimicrobialService from '@modules/Lab/services/AntimicrobialService';


export default class AntimicrobialController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const antimicrobialService = container.resolve(AntimicrobialService);

    const antimicrobial = await antimicrobialService.save({
      nome,
    });

    return response.json(antimicrobial);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { nome, id } = request.body;

    const antimicrobialService = container.resolve(AntimicrobialService);

    const antimicrobial = await antimicrobialService.update({
      nome,
      id,
    });

    return response.json(antimicrobial);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const antimicrobialService = container.resolve(AntimicrobialService);
    const { filtros, tamanho, pagina } = request.query

    const antimicrobial = await antimicrobialService.list({ filtros: String(filtros), tamanho: Number(tamanho), pagina: Number(pagina) });

    return response.json(antimicrobial);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const antimicrobialService = container.resolve(AntimicrobialService);
    const { id } = request.params

    const antimicrobial = await antimicrobialService.findById(id);

    return response.json(antimicrobial);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const antimicrobialService = container.resolve(AntimicrobialService);
    const { id } = request.params

    const antimicrobial = await antimicrobialService.delete(id);

    return response.json(antimicrobial);
  }

}
