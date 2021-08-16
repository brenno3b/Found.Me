import { getCustomRepository } from 'typeorm';

import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';
import AppError from '../../errors/AppError';

export default class ShowByIdUserService {
  async execute(userID: string): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(userID, {
      relations: ['address'],
    });

    if (!user) throw new AppError('User not found.');

    delete user.password;

    return user;
  }
}
