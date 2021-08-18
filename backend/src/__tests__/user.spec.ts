import request from 'supertest';
import { getConnection } from 'typeorm';

import app from '../app/app';
import createConnection from '../database/index';
import uuid from '../libs/uuid';

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

  it('Should fail when trying to create a user with an invalid e-mail.', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Randall Jaron',
        password: 'test123',
        age: 41,
        cpf: '11924014092',
        mainEmail: 'randa$ll_Jaron@test.com',
        mainPhoneNumber: '97958198898',
        address: {
          postalCode: '76908352',
          street: 'Rua Padre Sílvio',
          number: 1004,
          neighborhood: 'Nova Brasília',
          city: 'Jí-Paraná',
          uf: 'RO',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should fail when trying to create a user with an invalid CPF.', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Randall Jaron',
        password: 'test123',
        age: 41,
        cpf: '12395123133',
        mainEmail: 'randall_Jaron@test.com',
        secondEmail: 'randallWillio@outlook.com.us',
        mainPhoneNumber: '97958198898',
        address: {
          postalCode: '76908352',
          street: 'Rua Padre Sílvio',
          number: 1004,
          neighborhood: 'Nova Brasília',
          city: 'Jí-Paraná',
          uf: 'RO',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should fail when trying to create a user with an invalid DDD.', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Randall Jaron',
        password: 'test123',
        age: 41,
        cpf: '11924014092',
        mainEmail: 'randallJJ@test.com.tk',
        mainPhoneNumber: '03958198898',
        address: {
          postalCode: '76908352',
          street: 'Rua Padre Sílvio',
          number: 1004,
          neighborhood: 'Nova Brasília',
          city: 'Jí-Paraná',
          uf: 'RO',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should be able to create a user.', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Randall Jaron',
        password: 'test123',
        age: 41,
        cpf: '11924014092',
        mainEmail: 'randall_Jaron@test.com',
        mainPhoneNumber: '97958198898',
        secondPhoneNumber: '97988789100',
        address: {
          postalCode: '76908352',
          street: 'Rua Padre Sílvio',
          number: 1004,
          neighborhood: 'Nova Brasília',
          city: 'Jí-Paraná',
          uf: 'RO',
        },
      });

    expect(response.status).toBe(201);
  });

  it('Should fail when trying to create a user with an existing e-mail.', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Randall Jaron',
        password: 'test123',
        age: 41,
        cpf: '11924014092',
        mainEmail: 'randall_Jaron@test.com',
        mainPhoneNumber: '97958198898',
        secondPhoneNumber: '97988789100',
        address: {
          postalCode: '76908352',
          street: 'Rua Padre Sílvio',
          number: 1004,
          neighborhood: 'Nova Brasília',
          city: 'Jí-Paraná',
          uf: 'RO',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should fail when trying to create a user with an existing CPF.', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Randall Jaron',
        password: 'test123',
        age: 41,
        cpf: '11924014092',
        mainEmail: 'randallJay@test.com',
        mainPhoneNumber: '97958198898',
        address: {
          postalCode: '76908352',
          street: 'Rua Padre Sílvio',
          number: 1004,
          neighborhood: 'Nova Brasília',
          city: 'Jí-Paraná',
          uf: 'RO',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should fail when passing an invalid ID on Get method.', async () => {
    const randomString = uuid();

    const response = await request(app).get(`/user/${randomString}`);

    expect(response.status).toBe(400);
  });

  it('Should retrieve a user on Get method.', async () => {
    const { body } = await request(app)
      .post('/user')
      .send({
        name: 'Lois Raimundo',
        password: 'test123',
        age: 35,
        cpf: '93207054021',
        mainEmail: 'Lois7Raimundo@hotmail.com',
        mainPhoneNumber: '3787786547',
        address: {
          postalCode: '88816015',
          street: 'Rua Ana Herculano Magalhães',
          number: 15,
          complement: 'Apto 809',
          neighborhood: 'Renascer',
          city: 'Criciúma',
          uf: 'SC',
        },
      });

    const userID = body.id;

    const response = await request(app).get(`/user/${userID}`);

    expect(response.status).toBe(200);
  });

  it('Should fail when trying to update a user with an invalid e-mail.', async () => {
    const { body } = await request(app)
      .post('/user')
      .send({
        name: 'Jadyn Walt',
        password: 'test123',
        age: 60,
        cpf: '75839769010',
        mainEmail: 'JadynWalt@test.com',
        mainPhoneNumber: '21941412238',
        address: {
          postalCode: '11013550',
          street: 'Avenida Rangel Pestana',
          number: 56,
          neighborhood: 'Vila Mathias',
          city: 'Santos',
          uf: 'SP',
        },
      });

    const userID = body.id;

    const response = await request(app)
      .patch(`/user/${userID}`)
      .send({
        name: 'Jadyn Walt',
        password: 'test123',
        age: 60,
        cpf: '75839769010',
        mainEmail: 'Ja.dynWalt@test.com',
        secondEmail: 'JJdn_wakt@outlook.com',
        mainPhoneNumber: '21941412238',
        address: {
          postalCode: '11013550',
          street: 'Avenida Rangel Pestana',
          number: 56,
          neighborhood: 'Vila Mathias',
          city: 'Santos',
          uf: 'SP',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should fail when trying to update a user with an invalid DDD.', async () => {
    const { body } = await request(app)
      .post('/user')
      .send({
        name: 'Wes Salomé',
        password: 'test123',
        age: 44,
        cpf: '76342622001',
        mainEmail: 'Wes_48Salom@test.com',
        secondEmail: 'WesBusiness@outlook.com.us',
        mainPhoneNumber: '37989004142',
        address: {
          postalCode: '72927677',
          street: 'Quadra Quadra 5',
          number: 1,
          neighborhood: 'Jardim Águas Lindas II',
          city: 'Águas Lindas de Goiás',
          uf: 'GO',
        },
      });

    const userID = body.id;

    const response = await request(app)
      .patch(`/user/${userID}`)
      .send({
        name: 'Wes Salomé',
        password: 'test123',
        age: 44,
        cpf: '76342622001',
        mainEmail: 'Wes_48Salom@test.com',
        mainPhoneNumber: '03989004142',
        address: {
          postalCode: '72927677',
          street: 'Quadra Quadra 5',
          number: 1,
          neighborhood: 'Jardim Águas Lindas II',
          city: 'Águas Lindas de Goiás',
          uf: 'GO',
        },
      });

    expect(response.status).toBe(400);
  });

  it('Should update user info', async () => {
    const { body } = await request(app)
      .post('/user')
      .send({
        name: 'Corynn Nigellus',
        password: 'test123',
        age: 44,
        cpf: '14941033035',
        mainEmail: 'CorynnNig@test.com',
        mainPhoneNumber: '61989004142',
        secondPhoneNumber: '61977894432',
        address: {
          postalCode: '59104350',
          street: 'Rua Pastor Joaquim Batista de Macedo',
          number: 1,
          neighborhood: 'Igapó',
          city: 'Natal',
          uf: 'RN',
        },
      });

    const userID = body.id;

    const response = await request(app)
      .patch(`/user/${userID}`)
      .send({
        name: 'Corynn Nigellus',
        password: 'test123',
        age: 44,
        cpf: '14941033035',
        mainEmail: 'CorynnNigellus@test.com',
        secondEmail: 'Corynn.business@test.com.br',
        mainPhoneNumber: '61989004142',
        secondPhoneNumber: '61977894432',
        address: {
          postalCode: '59104350',
          street: 'Rua Pastor Joaquim Batista de Macedo',
          number: 52,
          neighborhood: 'Igapó',
          city: 'Natal',
          uf: 'RN',
        },
      });

    expect(response.status).toBe(200);
  });

  it('Should fail when trying to delete a user with an invalid id.', async () => {
    const randomString = uuid();

    const response = await request(app).delete(`/user/${randomString}`);

    expect(response.status).toBe(400);
  });

  it('Should delete a user', async () => {
    const { body } = await request(app)
      .post('/user')
      .send({
        name: ' Orpha Laurita ',
        password: 'test123',
        age: 16,
        cpf: '40643347011',
        mainEmail: 'Orph4Lau@test.com.fr',
        mainPhoneNumber: '48977890041',
        address: {
          postalCode: '59148634',
          street: 'Rua Sapucaia',
          number: 1105,
          neighborhood: 'Emaús',
          city: 'Parnamirim',
          uf: 'RN',
        },
      });

    const userID = body.id;

    const response = await request(app).delete(`/user/${userID}`);

    expect(response.status).toBe(204);
  });
});
