import { Repository, getRepository, EntityRepository, FindConditions, FindManyOptions, FindOperator, Equal, EntityManager } from 'typeorm'
import Pathogen from '@modules/Lab/infra/typeorm/models/Pathogen';
import { PathogenDTO } from '../DTO/PathogenDTO';
import ListRequest from '@shared/utils/ListRequest';
import a from '@shared/infra/typeorm/FilterGenerator';

export interface IPathogenRepository {
  create(pathogen: PathogenDTO): Promise<PathogenDTO>;
  findByName(name: string): Promise<PathogenDTO | undefined>;
  findAndCount(ListRequest: ListRequest): Promise<[PathogenDTO[], number]>;  // findAllById(products: IFindProducts[]): Promise<Product[]>;
  update(pathogen: PathogenDTO): Promise<PathogenDTO>;
  findById(id: string): Promise<PathogenDTO | undefined>;
  delete(id: string): Promise<PathogenDTO | undefined>;

}

@EntityRepository(Pathogen)
class PathogenRepository implements IPathogenRepository {
  private ormRepository: Repository<Pathogen>;

  constructor() {
    this.ormRepository = getRepository(Pathogen);
  }
  public async findByName(nome: string): Promise<Pathogen | undefined> {
    const findPathogen = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return findPathogen;
  };

  public async findById(id: string): Promise<PathogenDTO | undefined> {
    const findPathogen = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findPathogen;
  };


  public async create({
    nome,
    descricao,
  }: PathogenDTO) {
    const pathogen = await this.ormRepository.create({
      nome,
      descricao
    })

    return await this.ormRepository.save(pathogen);

  }

  public async findAndCount(ListRequest: ListRequest): Promise<[Pathogen[], number]> {
    const { filtros } = ListRequest
    const take = ListRequest.size || 10
    const page = ListRequest.page || 1

    const skip = (page - 1) * take;

    let convertedFilters: FindConditions<Pathogen>[] = []
    if (filtros) {
      convertedFilters = filtros.map(item => {
        let FindConditions: FindConditions<Pathogen> = {}

        if (item.atributo == "descricao" && item.comparador) {
          FindConditions["descricao"] = a(item.comparador, item.valor)
        }



        return FindConditions
      })
    }
    return await this.ormRepository.findAndCount({ where: convertedFilters, skip, take });
  }

  public async update(pathogen: PathogenDTO): Promise<Pathogen> {

    return await this.ormRepository.save(pathogen)
  }

  public async delete(id: string): Promise<Pathogen | undefined> {
    const pathogen = await this.ormRepository.findOne({ where: { id } })
    if (pathogen) {
      return await this.ormRepository.remove(pathogen)
    }
  }
}

export default PathogenRepository;