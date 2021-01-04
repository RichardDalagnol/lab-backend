import { Repository, getRepository, EntityRepository, FindConditions, FindManyOptions, FindOperator, Equal, EntityManager } from 'typeorm'
import Antimicrobial from '@modules/Lab/infra/typeorm/models/Antimicrobial';
import { AntimicrobialDTO } from '../DTO/AntimicrobialDTO';
import ListRequest from '@shared/utils/ListRequest';
import a from '@shared/infra/typeorm/FilterGenerator';

export interface IAntimicrobialRepository {
  create(antimicrobial: AntimicrobialDTO): Promise<AntimicrobialDTO>;
  findByName(name: string): Promise<AntimicrobialDTO | undefined>;
  findAndCount(ListRequest: ListRequest): Promise<[AntimicrobialDTO[], number]>;  // findAllById(products: IFindProducts[]): Promise<Product[]>;
  update(antimicrobial: AntimicrobialDTO): Promise<AntimicrobialDTO>;
  findById(id: string): Promise<AntimicrobialDTO | undefined>;
  delete(id: string): Promise<AntimicrobialDTO | undefined>;

}

@EntityRepository(Antimicrobial)
class AntimicrobialRepository implements IAntimicrobialRepository {
  private ormRepository: Repository<Antimicrobial>;

  constructor() {
    this.ormRepository = getRepository(Antimicrobial);
  }
  public async findByName(nome: string): Promise<Antimicrobial | undefined> {
    const findAntimicrobial = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return findAntimicrobial;
  };

  public async findById(id: string): Promise<AntimicrobialDTO | undefined> {
    const findAntimicrobial = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findAntimicrobial;
  };


  public async create({
    nome,
  }: AntimicrobialDTO) {
    const antimicrobial = await this.ormRepository.create({
      nome
    })

    return await this.ormRepository.save(antimicrobial);

  }

  public async findAndCount(ListRequest: ListRequest): Promise<[Antimicrobial[], number]> {
    const { filtros } = ListRequest
    const take = ListRequest.size || 10
    const page = ListRequest.page || 1

    const skip = (page - 1) * take;

    let convertedFilters: FindConditions<Antimicrobial>[] = []
    if (filtros) {
      convertedFilters = filtros.map(item => {
        let FindConditions: FindConditions<Antimicrobial> = {}

        if (item.atributo == "nome" && item.comparador) {
          FindConditions["nome"] = a(item.comparador, item.valor)
        }



        return FindConditions
      })
    }
    return await this.ormRepository.findAndCount({ where: convertedFilters, skip, take });
  }

  public async update(antimicrobial: AntimicrobialDTO): Promise<Antimicrobial> {

    return await this.ormRepository.save(antimicrobial)
  }

  public async delete(id: string): Promise<Antimicrobial | undefined> {
    const antimicrobial = await this.ormRepository.findOne({ where: { id } })
    if (antimicrobial) {
      return await this.ormRepository.remove(antimicrobial)
    }
  }
}

export default AntimicrobialRepository;