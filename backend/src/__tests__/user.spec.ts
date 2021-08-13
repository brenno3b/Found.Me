import request from 'supertest';
import { getConnection } from 'typeorm';

import app from '../app/app';
import createConnection from '../database/index';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await getConnection();

    await connection.dropDatabase();
    await connection.close();
  });

  it('Should not be able to create a new user with an invalid e-mail', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Brenno',
        password: 'test123',
        age: 20,
        cpf: '78906636415',
        mainEmail: 'br$nno@gmail.com',
        mainPhoneNumber: '13996228772',
        address: {
          postalCode: '11325080',
          street: 'Rua Ernesto Sebastião do Nascimento',
          number: 250,
          complement: 'Casa 2, fundos',
          neighborhood: 'Japuí',
          city: 'São Vicente',
          uf: 'SP',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should not be able to create a new user with an invalid CPF', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Brenno',
        password: 'test123',
        age: 20,
        cpf: '001232131230',
        mainEmail: 'brenno@gmail.com',
        mainPhoneNumber: '13996228772',
        address: {
          postalCode: '11325080',
          street: 'Rua Ernesto Sebastião do Nascimento',
          number: 250,
          complement: 'Casa 2, fundos',
          neighborhood: 'Japuí',
          city: 'São Vicente',
          uf: 'SP',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should not be able to create a new user with an invalid DDD', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'John',
        password: 'test123',
        age: 20,
        cpf: '78906636415',
        mainEmail: 'brenno@gmail.com',
        secondEmail: 'brenno3b@gmail.com',
        mainPhoneNumber: '05996228772',
        address: {
          postalCode: '11325080',
          street: 'Rua Ernesto Sebastião do Nascimento',
          number: 250,
          complement: 'Casa 2, fundos',
          neighborhood: 'Japuí',
          city: 'São Vicente',
          uf: 'SP',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'John',
        password: 'test123',
        age: 20,
        cpf: '78906636415',
        mainEmail: 'brennover@gmail.com',
        secondEmail: 'brenno3b@gmail.com',
        mainPhoneNumber: '13996228772',
        secondPhoneNumber: '13997276275',
        address: {
          postalCode: '72333020',
          street: 'Rua Ernesto Sebastião do Nascimento',
          number: 250,
          complement: 'Casa 2, fundos',
          neighborhood: 'Japuí',
          city: 'São Vicente',
          uf: 'SP',
        },
      });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new user with an existing e-mail', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'John',
        password: 'test123',
        age: 20,
        cpf: '49806496884',
        mainEmail: 'brennover@gmail.com',
        secondEmail: 'brenno3b@gmail.com',
        mainPhoneNumber: '13996228772',
        secondPhoneNumber: '13997276275',
        address: {
          postalCode: '72333020',
          street: 'Rua Ernesto Sebastião do Nascimento',
          number: 250,
          complement: 'Casa 2, fundos',
          neighborhood: 'Japuí',
          city: 'São Vicente',
          uf: 'SP',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should not be able to create a new user with an existing CPF', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'John',
        password: 'test123',
        age: 20,
        cpf: '78906636415',
        mainEmail: 'test@gmail.com',
        mainPhoneNumber: '13996228772',
        secondPhoneNumber: '13997276275',
        address: {
          postalCode: '72333020',
          street: 'Rua Ernesto Sebastião do Nascimento',
          number: 250,
          complement: 'Casa 2, fundos',
          neighborhood: 'Japuí',
          city: 'São Vicente',
          uf: 'SP',
        },
      });
    expect(response.status).toBe(400);
  });
});
