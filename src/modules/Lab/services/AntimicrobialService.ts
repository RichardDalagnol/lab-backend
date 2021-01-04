import { inject, injectable } from 'tsyringe'
import AntimicrobialRepository from '../repositories/AntimicrobialRepository';
import Antimicrobial from '../infra/typeorm/models/Antimicrobial';
import AppError from '@shared/errors/AppError';
import Filtro from '@shared/utils/Filtro'
import { AntimicrobialDTO } from '../DTO/AntimicrobialDTO';


interface CreateRequest {
  nome: string,
}

interface BuscarRequest {
  filtros?: string,
  tamanho: number,
  pagina: number
}


@injectable()
class AntimicrobialService {
  constructor(
    @inject('AntimicrobialRepository')
    private antimicrobialRepository: AntimicrobialRepository,
  ) { }
  public async save({ nome }: CreateRequest): Promise<Antimicrobial> {
    const existAntimicrobial = await this.antimicrobialRepository.findByName(nome);

    if (existAntimicrobial) {
      throw new AppError("Já existe um agente antimicrobiano com este nome");
    }

    const antimicrobial = this.antimicrobialRepository.create({
      nome
    })

    return antimicrobial;
  }

  public async list({ filtros, tamanho, pagina }: BuscarRequest): Promise<[Antimicrobial[], number]> {

    const selecao = new Filtro();
    const filtro = selecao.build(String(filtros));


    return this.antimicrobialRepository.findAndCount({ filtros: filtro, page: pagina, size: tamanho });
  }

  public async findById(id: string): Promise<AntimicrobialDTO | undefined> {
    return this.antimicrobialRepository.findById(id);
  }


  public async update({ nome, id }: AntimicrobialDTO): Promise<Antimicrobial> {

    if (nome) {
      const existAntimicrobial = await this.antimicrobialRepository.findByName(nome);
      if (existAntimicrobial && existAntimicrobial?.id !== id) {
        throw new AppError("Já existe um agente antimicrobiano com este nome");
      }
    }


    const antimicrobial = this.antimicrobialRepository.update({
      id,
      nome
    })

    return antimicrobial;
  }

  public async delete(id: string): Promise<AntimicrobialDTO | undefined> {

    try {
      return this.antimicrobialRepository.delete(id);

    } catch {
      throw new AppError("Não foi possível deletar ")
    }

  }

}
export default AntimicrobialService;