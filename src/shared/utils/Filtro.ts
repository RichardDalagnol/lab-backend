export interface Filtros {
  atributo?: string,
  comparador?: string,
  valor?: any
}

class Filtro {
  public build(filtros: string): Filtros[] {

    const teste = filtros.split(',');

    let FiltroTeste: Filtros[] = teste.map(item => {
      let filtro: Filtros = {}

      if (item.indexOf("=") !== -1) {
        let aux = item.split('=');
        filtro.atributo = aux[0];
        filtro.comparador = '='
        filtro.valor = aux[1]
        return filtro
      }
      return filtro
    })

    return FiltroTeste;
  }
}


export default Filtro;