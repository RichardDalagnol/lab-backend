import { inject, injectable } from 'tsyringe'
import PathogenRepository from '../repositories/PathogenRepository';
import Pathogen from '../infra/typeorm/models/Pathogen';
import AppError from '@shared/errors/AppError';
import Filtro from '@shared/utils/Filtro'
import { PathogenDTO } from '../DTO/PathogenDTO';


interface CreateRequest {
  nome: string,
  descricao: string,
}

interface BuscarRequest {
  filtros?: string,
  tamanho: number,
  pagina: number
}


@injectable()
class PathogenService {
  constructor(
    @inject('PathogenRepository')
    private pathogenRepository: PathogenRepository,
  ) { }
  public async save({ nome, descricao }: CreateRequest): Promise<Pathogen> {
    const existPathogen = await this.pathogenRepository.findByName(nome);

    if (existPathogen) {
      throw new AppError("Já existe um agente patógeno com este nome");
    }

    const pathogen = this.pathogenRepository.create({
      nome,
      descricao
    })

    return pathogen;
  }

  public async list({ filtros, tamanho, pagina }: BuscarRequest): Promise<[Pathogen[], number]> {

    const selecao = new Filtro();
    const filtro = selecao.build(String(filtros));


    return this.pathogenRepository.findAndCount({ filtros: filtro, page: pagina, size: tamanho });
  }

  public async findById(id: string): Promise<PathogenDTO | undefined> {
    return this.pathogenRepository.findById(id);
  }


  public async update({ nome, descricao, id }: PathogenDTO): Promise<Pathogen> {

    if (nome) {
      const existPathogen = await this.pathogenRepository.findByName(nome);
      if (existPathogen && existPathogen?.id !== id) {
        throw new AppError("Já existe um agente patógeno com este nome");
      }
    }


    const pathogen = this.pathogenRepository.update({
      id,
      nome,
      descricao
    })

    return pathogen;
  }

  public async delete(id: string): Promise<PathogenDTO | undefined> {

    try {
      return this.pathogenRepository.delete(id);

    } catch {
      throw new AppError("Não foi possível deletar ")
    }

  }

}
export default PathogenService;