import { Equal, FindOperator } from 'typeorm';

export default function a(comparador: string, valor: string) {
  switch (comparador) {
    case '=':
      return Equal(valor)
  }
}

