export interface IAddress {
  readonly id?: string;

  postalCode: string;

  street: string;

  number: number;

  complement?: string;

  neighborhood: string;

  city: string;

  uf: string;
}
