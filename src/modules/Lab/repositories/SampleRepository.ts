import { Repository, getRepository, EntityRepository, FindConditions, FindManyOptions, FindOperator, Equal, EntityManager } from 'typeorm'
import Sample from '@modules/Lab/infra/typeorm/models/Sample';
import { SampleDTO } from '../DTO/SampleDTO';
import ListRequest from '@shared/utils/ListRequest';
import SampleItem from '../infra/typeorm/models/SampleItem';
import a from '@shared/infra/typeorm/FilterGenerator';

export interface ISampleRepository {
  create(sample: SampleDTO): Promise<SampleDTO>;
  findByName(nome: string): Promise<SampleDTO | undefined>;
  findAndCount(ListRequest: ListRequest): Promise<[SampleDTO[], number]>;  // findAllById(products: IFindProducts[]): Promise<Product[]>;
  update(sample: SampleDTO): Promise<SampleDTO>;
  findById(id: string): Promise<SampleDTO | undefined>;
  delete(id: string): Promise<SampleDTO | undefined>;

}

@EntityRepository(Sample)
class SampleRepository implements ISampleRepository {
  private ormRepository: Repository<Sample>;
  private sampleItemRepository: Repository<SampleItem>

  constructor() {
    this.ormRepository = getRepository(Sample);
    this.sampleItemRepository = getRepository(SampleItem)
  }
  public async findByName(descricao: string): Promise<Sample | undefined> {
    const findSample = await this.ormRepository.findOne({
      where: {
        descricao,
      },
    });

    return findSample;
  };

  public async findById(id: string): Promise<SampleDTO | undefined> {
    const findSample = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findSample;
  };


  public async create({
    descricao,
    especie,
    raca,
    sexo,
    idade,
    proprietario,
    ano,
    observacao,
    flagTratamento,
    flagAcondicionada,
    valor,
    flagPago,
    dataRecebimento,
    requisitante,
    amostraItens
  }: SampleDTO) {

    const numeroMax = await this.ormRepository.findOne({
      where: {
        ano,
      },
      order: {
        numero: "DESC"
      }
    })
    let numero = 1;
    if (numeroMax) {
      numero = numeroMax.numero + 1
    }

    const sample = await this.ormRepository.save({
      descricao,
      requisitante_id: requisitante.id,
      requisitante: { id: requisitante.id },
      especie,
      raca,
      sexo,
      idade,
      proprietario,
      numero,
      ano,
      observacao,
      flagTratamento,
      flagAcondicionada,
      valor,
      flagPago,
      dataRecebimento
    })

    const sampleItensStored = amostraItens.map(amostraItem => ({
      amostra: { id: sample.id },
      amostra_id: sample.id,
      descricao: amostraItem.descricao
    }));

    const storedSampleItens = await this.sampleItemRepository.save(
      sampleItensStored,
    );

    sample.amostraItens = storedSampleItens;
    return await this.ormRepository.save(sample);

  }

  public async findAndCount(ListRequest: ListRequest): Promise<[Sample[], number]> {
    const { filtros } = ListRequest
    const take = ListRequest.size || 10
    const page = ListRequest.page || 1

    const skip = (page - 1) * take;

    let convertedFilters: FindConditions<Sample>[] = []
    if (filtros) {
      convertedFilters = filtros.map(item => {
        let FindConditions: FindConditions<Sample> = {}
        return FindConditions
      })
    }
    return await this.ormRepository.findAndCount({ relations: ['requisitante', 'amostraItens'], where: convertedFilters, skip, take });
  }

  public async update(sample: SampleDTO): Promise<Sample> {

    return await this.ormRepository.save(sample)
  }

  public async delete(id: string): Promise<Sample | undefined> {
    const sample = await this.ormRepository.findOne({ where: { id } })
    if (sample) {
      return await this.ormRepository.remove(sample)
    }
  }
}

export default SampleRepository;