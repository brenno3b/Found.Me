import { IAddress } from '../entities';

export interface IRequest {
  id?: number;

  age: number;

  cpf: string;

  name: string;

  password: string;

  mainEmail: string;

  secondEmail?: string;

  mainPhoneNumber: string;

  secondPhoneNumber?: string;

  address: IAddress;
}
