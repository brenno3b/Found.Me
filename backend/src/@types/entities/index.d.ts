export interface IAddress {
  readonly id: string;

  postalCode: string;

  street: string;

  number: number;

  complement: string;

  neighborhood: string;

  city: string;

  uf: string;
}

export interface IUser {
  readonly id: string;

  age: number;

  cpf: string;

  name: string;

  mainEmail: string;

  secondEmail?: string;

  mainPhoneNumber: string;

  secondPhoneNumber?: string;

  address: IAddress;
}
