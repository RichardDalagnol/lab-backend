import { inject, injectable } from 'tsyringe'
import RequesterRepository from '../repositories/RequesterRepository';
import Requester from '../infra/typeorm/models/Requester';
import AppError from '@shared/errors/AppError';
import Filtro from '@shared/utils/Filtro'
import { RequesterDTO } from '../DTO/RequesterDTO';


interface CreateRequest {
  nome: string,
  email: string,
  cidade: string,
  numero: number,
  telefone: string,
  rua: string,
  bairro: string,
}

interface BuscarRequest {
  filtros?: string,
  tamanho: number,
  pagina: number
}


@injectable()
class RequesterService {
  constructor(
    @inject('RequesterRepository')
    private requesterRepository: RequesterRepository,
  ) { }
  public async save({ nome, bairro, cidade, email, numero, rua, telefone }: CreateRequest): Promise<Requester> {
    const existRequester = await this.requesterRepository.findByName(nome);

    if (existRequester) {
      throw new AppError("Já existe um requisitante com este nome");
    }

    const requester = this.requesterRepository.create({
      nome, bairro, cidade, email, numero, rua, telefone
    })

    return requester;
  }

  public async list({ filtros, tamanho, pagina }: BuscarRequest): Promise<[Requester[], number]> {

    const selecao = new Filtro();
    const filtro = selecao.build(String(filtros));


    return this.requesterRepository.findAndCount({ filtros: filtro, page: pagina, size: tamanho });
  }

  public async findById(id: string): Promise<RequesterDTO | undefined> {
    return this.requesterRepository.findById(id);
  }


  public async update({ nome, bairro, cidade, email, numero, rua, telefone, id }: RequesterDTO): Promise<Requester> {

    if (nome) {
      const existRequester = await this.requesterRepository.findByName(nome);
      if (existRequester && existRequester?.id !== id) {
        throw new AppError("Já existe um agente patógeno com este nome");
      }
    }


    const requester = this.requesterRepository.update({
      nome, bairro, cidade, email, numero, rua, telefone, id
    })

    return requester;
  }

  public async delete(id: string): Promise<RequesterDTO | undefined> {

    try {
      return this.requesterRepository.delete(id);

    } catch {
      throw new AppError("Não foi possível deletar ")
    }

  }

}
export default RequesterService;