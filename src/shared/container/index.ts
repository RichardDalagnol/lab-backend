import { container } from 'tsyringe';

import '@modules/User/providers';
import './providers';

import UsersRepository, { IUsersRepository } from '@modules/User/repositories/UserRepository';
import AntimicrobialRepository, { IAntimicrobialRepository } from '@modules/Lab/repositories/AntimicrobialRepository';
import PathogenRepository, { IPathogenRepository } from '@modules/Lab/repositories/PathogenRepository';
import RequesterRepository, { IRequesterRepository } from '@modules/Lab/repositories/RequesterRepository';
import SampleRepository, { ISampleRepository } from '@modules/Lab/repositories/SampleRepository';



container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAntimicrobialRepository>(
  'AntimicrobialRepository',
  AntimicrobialRepository,
);
container.registerSingleton<IPathogenRepository>(
  'PathogenRepository',
  PathogenRepository,
);
container.registerSingleton<IRequesterRepository>(
  'RequesterRepository',
  RequesterRepository,
);
container.registerSingleton<ISampleRepository>(
  'SampleRepository',
  SampleRepository,
);


