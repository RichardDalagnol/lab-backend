import { Repository, getRepository, EntityRepository, FindConditions, FindManyOptions, FindOperator, Equal, EntityManager } from 'typeorm'
import SampleItem from '@modules/Lab/infra/typeorm/models/SampleItem';
import { SampleItemDTO } from '../DTO/SampleItemDTO';
import ListRequest from '@shared/utils/ListRequest';

export interface ISampleItemRepository {
  create(sampleItem: SampleItemDTO): Promise<SampleItemDTO>;
  findAndCount(ListRequest: ListRequest): Promise<[SampleItemDTO[], number]>;  // findAllById(products: IFindProducts[]): Promise<Product[]>;
  update(sampleItem: SampleItemDTO): Promise<SampleItemDTO>;
  findById(id: string): Promise<SampleItemDTO | undefined>;
  delete(id: string): Promise<SampleItemDTO | undefined>;

}

@EntityRepository(SampleItem)
class SampleItemRepository implements ISampleItemRepository {
  private ormRepository: Repository<SampleItem>;

  constructor() {
    this.ormRepository = getRepository(SampleItem);
  }

  public async findById(id: string): Promise<SampleItemDTO | undefined> {
    const findSampleItem = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findSampleItem;
  };


  public async create({
    descricao,
    amostra
  }: SampleItemDTO) {
    const sampleItem = await this.ormRepository.create({
      descricao,
      amostra_id: amostra.id
    })

    return await this.ormRepository.save(sampleItem);

  }

  public async findAndCount(ListRequest: ListRequest): Promise<[SampleItem[], number]> {
    const { filtros } = ListRequest
    const take = ListRequest.size || 10
    const page = ListRequest.page || 1

    const skip = (page - 1) * take;

    let convertedFilters: FindConditions<SampleItem>[] = []
    if (filtros) {
      convertedFilters = filtros.map(item => {
        let FindConditions: FindConditions<SampleItem> = {}
        return FindConditions
      })
    }
    return await this.ormRepository.findAndCount({ where: convertedFilters, skip, take });
  }

  public async update(sampleItem: SampleItemDTO): Promise<SampleItem> {

    return await this.ormRepository.save(sampleItem)
  }

  public async delete(id: string): Promise<SampleItem | undefined> {
    const sampleItem = await this.ormRepository.findOne({ where: { id } })
    if (sampleItem) {
      return await this.ormRepository.remove(sampleItem)
    }
  }
}

export default SampleItemRepository;