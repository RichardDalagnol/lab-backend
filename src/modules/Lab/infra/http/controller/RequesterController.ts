import { Request, Response } from 'express';

import { container } from 'tsyringe';
import RequesterService from '@modules/Lab/services/RequesterService';


export default class RequesterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, bairro, cidade, email, numero, rua, telefone } = request.body;

    const requesterService = container.resolve(RequesterService);

    const requester = await requesterService.save({
      nome, bairro, cidade, email, numero, rua, telefone
    });

    return response.json(requester);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { nome, bairro, cidade, email, numero, rua, telefone, id } = request.body;

    const requesterService = container.resolve(RequesterService);

    const requester = await requesterService.update({
      nome, bairro, cidade, email, numero, rua, telefone, id
    });

    return response.json(requester);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const requesterService = container.resolve(RequesterService);
    const { filtros, tamanho, pagina } = request.query

    const requester = await requesterService.list({ filtros: String(filtros), tamanho: Number(tamanho), pagina: Number(pagina) });

    return response.json(requester);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const requesterService = container.resolve(RequesterService);
    const { id } = request.params

    const requester = await requesterService.findById(id);

    return response.json(requester);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const requesterService = container.resolve(RequesterService);
    const { id } = request.params

    const requester = await requesterService.delete(id);

    return response.json(requester);
  }

}
