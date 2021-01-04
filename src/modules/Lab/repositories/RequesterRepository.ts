import { Repository, getRepository, EntityRepository, FindConditions, FindManyOptions, FindOperator, Equal, EntityManager } from 'typeorm'
import Requester from '@modules/Lab/infra/typeorm/models/Requester';
import { RequesterDTO } from '../DTO/RequesterDTO';
import ListRequest from '@shared/utils/ListRequest';
import a from '@shared/infra/typeorm/FilterGenerator';

export interface IRequesterRepository {
  create(requester: RequesterDTO): Promise<RequesterDTO>;
  findByName(nome: string): Promise<RequesterDTO | undefined>;
  findAndCount(ListRequest: ListRequest): Promise<[RequesterDTO[], number]>;  // findAllById(products: IFindProducts[]): Promise<Product[]>;
  update(requester: RequesterDTO): Promise<RequesterDTO>;
  findById(id: string): Promise<RequesterDTO | undefined>;
  delete(id: string): Promise<RequesterDTO | undefined>;

}

@EntityRepository(Requester)
class RequesterRepository implements IRequesterRepository {
  private ormRepository: Repository<Requester>;

  constructor() {
    this.ormRepository = getRepository(Requester);
  }
  public async findByName(nome: string): Promise<Requester | undefined> {
    const findRequester = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return findRequester;
  };

  public async findById(id: string): Promise<RequesterDTO | undefined> {
    const findRequester = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findRequester;
  };


  public async create({
    nome,
    bairro,
    cidade,
    email,
    numero,
    rua,
    telefone
  }: RequesterDTO) {
    const requester = await this.ormRepository.create({
      nome,
      bairro,
      cidade,
      email,
      numero,
      rua,
      telefone
    })

    return await this.ormRepository.save(requester);

  }

  public async findAndCount(ListRequest: ListRequest): Promise<[Requester[], number]> {
    const { filtros } = ListRequest
    const take = ListRequest.size || 10
    const page = ListRequest.page || 1

    const skip = (page - 1) * take;

    let convertedFilters: FindConditions<Requester>[] = []
    if (filtros) {
      convertedFilters = filtros.map(item => {
        let FindConditions: FindConditions<Requester> = {}

        if (item.atributo == "nome" && item.comparador) {
          FindConditions["nome"] = a(item.comparador, item.valor)
        }



        return FindConditions
      })
    }
    return await this.ormRepository.findAndCount({ where: convertedFilters, skip, take });
  }

  public async update(requester: RequesterDTO): Promise<Requester> {

    return await this.ormRepository.save(requester)
  }

  public async delete(id: string): Promise<Requester | undefined> {
    const requester = await this.ormRepository.findOne({ where: { id } })
    if (requester) {
      return await this.ormRepository.remove(requester)
    }
  }
}

export default RequesterRepository;