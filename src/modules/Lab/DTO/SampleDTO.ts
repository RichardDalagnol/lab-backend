import SampleItens from '@modules/Lab/infra/typeorm/models/SampleItem'
import Requester from '../infra/typeorm/models/Requester';
export interface SampleDTO {
  id?: string,
  descricao?: string,
  especie?: string,
  raca?: string,
  sexo?: 'masculino' | 'feminino',
  idade?: string,
  proprietario?: string,
  numero?: number,
  ano?: number,
  observacao?: string,
  flagTratamento?: boolean,
  flagAcondicionada?: boolean,
  valor?: number,
  flagPago?: boolean,
  dataRecebimento?: Date,
  amostraItens: SampleItens[],
  requisitante: Requester
}