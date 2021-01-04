import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '../repositories/UserRepository';
import User from '@modules/User/infra/typeorm/models/User';
import authConfig from '@config/authConfig'
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { classToClass } from 'class-transformer'

import { CreateRequest, AuthRequest, AuthResponse } from '@modules/User/DTO/userDTO'


@injectable()
class UserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }
  public async save({ nome, email, senha }: CreateRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(senha);

    const user = await this.usersRepository.create({
      nome,
      email,
      flag_adm: false,
      senha: hashedPassword,
    });

    return user;
  }


  public async auth({ email, senha }: AuthRequest): Promise<AuthResponse | undefined> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/senha combination.', 401);
    }

    const senhaMatched = await this.hashProvider.compareHash(
      senha,
      user.senha,
    );

    if (!senhaMatched) {
      throw new AppError('Incorrect email/senha combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return classToClass({
      user,
      token,
    });
  }
}

export default UserService;