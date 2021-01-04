import { Repository, getRepository, EntityRepository, FindConditions, FindManyOptions, FindOperator, Equal, EntityManager } from 'typeorm'
import PathogenInItem from '@modules/Lab/infra/typeorm/models/PathogenInSampleItem';
import ListRequest from '@shared/utils/ListRequest';
import a from '@shared/infra/typeorm/FilterGenerator';

export interface IPathogenInSampleItemRepository {
  create(pathogen: PathogenInItem[]): Promise<PathogenInItem[]>;
  findAndCount(ListRequest: ListRequest): Promise<[PathogenInItem[], number]>;  // findAllById(products: IFindProducts[]): Promise<Product[]>;
  update(pathogen: PathogenInItem[]): Promise<PathogenInItem[]>;
  findById(id: string): Promise<PathogenInItem | undefined>;
  delete(id: string): Promise<PathogenInItem | undefined>;

}

@EntityRepository(PathogenInItem)
class PathogenInItemRepository implements IPathogenInSampleItemRepository {
  private ormRepository: Repository<PathogenInItem>;

  constructor() {
    this.ormRepository = getRepository(PathogenInItem);
  }

  public async findById(id: string): Promise<PathogenInItem | undefined> {
    const findPathogenInItem = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findPathogenInItem;
  };


  public async create(pathogenInItemList: PathogenInItem[]) {
    const pathogen = await this.ormRepository.create(pathogenInItemList)

    return await this.ormRepository.save(pathogenInItemList);

  }

  public async findAndCount(ListRequest: ListRequest): Promise<[PathogenInItem[], number]> {
    const { filtros } = ListRequest
    const take = ListRequest.size || 10
    const page = ListRequest.page || 1

    const skip = (page - 1) * take;

    let convertedFilters: FindConditions<PathogenInItem>[] = []
    if (filtros) {
      convertedFilters = filtros.map(item => {
        let FindConditions: FindConditions<PathogenInItem> = {}

        return FindConditions
      })
    }
    return await this.ormRepository.findAndCount({ relations: ['patogeno', 'amostra_item'], where: convertedFilters, skip, take });
  }

  public async update(pathogen: PathogenInItem[]): Promise<PathogenInItem[]> {

    return await this.ormRepository.save(pathogen)
  }

  public async delete(id: string): Promise<PathogenInItem | undefined> {
    const pathogen = await this.ormRepository.findOne({ where: { id } })
    if (pathogen) {
      return await this.ormRepository.remove(pathogen)
    }
  }
}

export default PathogenInItemRepository;