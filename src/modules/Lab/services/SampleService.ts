import { inject, injectable } from 'tsyringe'
import SampleRepository from '../repositories/SampleRepository';
import Sample from '../infra/typeorm/models/Sample';
import AppError from '@shared/errors/AppError';
import Filtro from '@shared/utils/Filtro'
import { SampleDTO } from '../DTO/SampleDTO';
import SampleItem from '../infra/typeorm/models/SampleItem';
import Requester from '../infra/typeorm/models/Requester';


interface CreateRequest {
  descricao?: string;
  ano: number,
  especie?: string;
  raca?: string;
  sexo?: 'masculino' | 'feminino';
  idade?: string;
  proprietario?: string;
  observacao?: string;
  flagTratamento?: boolean;
  flagAcondicionada?: boolean;
  valor?: number;
  flagPago?: boolean;
  dataRecebimento?: Date;
  requisitante: Requester,
  amostraItens: SampleItem[]
}

interface BuscarRequest {
  filtros?: string,
  tamanho: number,
  pagina: number
}


@injectable()
class SampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: SampleRepository,
  ) { }
  public async save({
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
    ano,
    requisitante,
    flagPago,
    dataRecebimento, amostraItens }: CreateRequest): Promise<Sample> {
    const sample = this.sampleRepository.create({
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
      requisitante,
      ano,
      amostraItens
    })

    return sample;
  }

  public async list({ filtros, tamanho, pagina }: BuscarRequest): Promise<[Sample[], number]> {

    const selecao = new Filtro();
    const filtro = selecao.build(String(filtros));


    return this.sampleRepository.findAndCount({ filtros: filtro, page: pagina, size: tamanho });
  }

  public async findById(id: string): Promise<SampleDTO | undefined> {
    return this.sampleRepository.findById(id);
  }


  public async update({
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
    requisitante,
    amostraItens,
    id }: SampleDTO): Promise<Sample> {
    const sample = this.sampleRepository.update({
      id,
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
      requisitante,
      flagPago,
      dataRecebimento, amostraItens
    })

    return sample;
  }

  public async delete(id: string): Promise<SampleDTO | undefined> {

    try {
      return this.sampleRepository.delete(id);

    } catch {
      throw new AppError("Não foi possível deletar ")
    }

  }

}
export default SampleService;