import { getCustomRepository } from 'typeorm';

import { IRequest } from '../../@types/services';

import { AddressesRepository } from '../../repositories/AddressesRepository';
import { UsersRepository } from '../../repositories/UsersRepository';

import AppError from '../../errors/AppError';

import isEmailValid from '../../libs/isEmailValid';
import isCPFValid from '../../libs/isCPFValid';
import isPhoneNumberValid from '../../libs/isPhoneNumberValid';

export default class CreateUserService {
  async execute(request: IRequest) {
    const addressRepository = getCustomRepository(AddressesRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const {
      name,
      password,
      age,
      cpf,
      mainEmail,
      secondEmail = null,
      mainPhoneNumber,
      secondPhoneNumber = null,
      address,
    } = request;

    const {
      postalCode,
      street,
      number,
      complement = null,
      neighborhood,
      city,
      uf,
    } = address;

    if (!isEmailValid(mainEmail)) throw new AppError('Invalid e-mail !');
    if (!isEmailValid(secondEmail) && secondEmail !== null) {
      throw new AppError('Invalid second e-mail !');
    }

    if (!isCPFValid(cpf)) throw new AppError('Invalid CPF !');

    if (!isPhoneNumberValid(mainPhoneNumber)) {
      throw new AppError('Invalid phone !');
    }
    if (!isPhoneNumberValid(secondPhoneNumber) && secondPhoneNumber !== null) {
      throw new AppError('Invalid second phone !');
    }

    const whereOption = secondEmail
      ? [{ mainEmail }, { secondEmail }]
      : [{ mainEmail }];

    const emailAlreadyExists = await usersRepository.find({
      select: ['mainEmail', 'secondEmail'],
      where: whereOption,
    });

    console.log(emailAlreadyExists);

    if (emailAlreadyExists.length !== 0) {
      throw new AppError('E-mail already registered !');
    }

    const cpfAlreadyExists = await usersRepository.find({
      select: ['cpf'],
      where: { cpf },
    });

    if (cpfAlreadyExists.length !== 0) {
      throw new AppError('CPF already registered !');
    }

    const userAddress = addressRepository.create({
      postalCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      uf,
    });

    await addressRepository.save(userAddress);

    const user = usersRepository.create({
      name,
      password,
      age,
      cpf,
      mainEmail,
      secondEmail,
      mainPhoneNumber,
      secondPhoneNumber,
      address: userAddress,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}
