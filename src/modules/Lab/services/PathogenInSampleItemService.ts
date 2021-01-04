import { inject, injectable } from 'tsyringe'
import PathogenInSampleItemRepository from '../repositories/PathogenInSampleItemRepository';
import PathogenInSampleItem from '../infra/typeorm/models/PathogenInSampleItem';
import AppError from '@shared/errors/AppError';
import Filtro from '@shared/utils/Filtro'


interface CreateRequest {
  amostra_item_id: string,
  patogenos: string[],
}

interface UpdateRequest {
  id: string,
  amostra_item_id: string,
  patogeno_id: string,
}

interface BuscarRequest {
  filtros?: string,
  tamanho: number,
  pagina: number
}


@injectable()
class PathogenInSampleItemService {
  constructor(
    @inject('PathogenInSampleItemRepository')
    private pathogenRepository: PathogenInSampleItemRepository,
  ) { }
  public async save({ amostra_item_id, patogenos }: CreateRequest): Promise<PathogenInSampleItem[]> {
    try {

      const phatogenInSampleItens = patogenos.map(patogeno => {
        let pathogenInSampleItem = new PathogenInSampleItem();
        pathogenInSampleItem.amostra_item_id = amostra_item_id
        pathogenInSampleItem.patogeno_id = patogeno

        return pathogenInSampleItem;
      })

      const pathogen = this.pathogenRepository.create(phatogenInSampleItens)

      return pathogen;
    } catch (e) {
      throw new AppError(e)
    }
  }

  public async list({ filtros, tamanho, pagina }: BuscarRequest): Promise<[PathogenInSampleItem[], number]> {

    const selecao = new Filtro();
    const filtro = selecao.build(String(filtros));


    return this.pathogenRepository.findAndCount({ filtros: filtro, page: pagina, size: tamanho });
  }

  public async findById(id: string): Promise<PathogenInSampleItem | undefined> {
    return this.pathogenRepository.findById(id);
  }


  public async update(patogenos: UpdateRequest[]): Promise<PathogenInSampleItem[]> {

    const phatogenInSampleItens = patogenos.map(patogeno => {
      let pathogenInSampleItem = new PathogenInSampleItem();
      pathogenInSampleItem.id = patogeno.id
      pathogenInSampleItem.amostra_item_id = patogeno.amostra_item_id
      pathogenInSampleItem.patogeno_id = patogeno.patogeno_id

      return pathogenInSampleItem;
    })
    const pathogen = this.pathogenRepository.update(phatogenInSampleItens)

    return pathogen;
  }

  public async delete(id: string): Promise<PathogenInSampleItem | undefined> {

    try {
      return this.pathogenRepository.delete(id);

    } catch {
      throw new AppError("Não foi possível deletar ")
    }

  }

}
export default PathogenInSampleItemService;