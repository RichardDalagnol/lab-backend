import Sample from '@modules/Lab/infra/typeorm/models/Sample'

export interface SampleItemDTO {
  descricao?: string,
  amostra: Sample,
  id?: string
}