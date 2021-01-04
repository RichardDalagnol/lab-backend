import User from '@modules/User/infra/typeorm/models/User'
export interface CreateRequest {
  nome: string,
  email: string,
  senha: string
}

export interface AuthRequest {
  email: string,
  senha: string
}

export interface AuthResponse {
  user: User,
  token: string,
}