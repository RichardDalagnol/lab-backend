import { Filtros } from "./Filtro";

export default interface ListRequest {
  filtros?: Filtros[],
  page: number,
  size: number
}