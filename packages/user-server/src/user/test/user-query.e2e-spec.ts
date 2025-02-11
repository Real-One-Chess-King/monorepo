import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import * as request from 'supertest';
import { AuthService } from '../../auth/auth.service';
import { generateSignInInput } from '../../auth/factory/sign-in.input.factory';
import { getUserQuery } from '../../queries/get-user.query';

jest.setTimeout(5 * 60 * 1000);

describe('User resolver > get user', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return user by pkey', async () => {
    const { email, password } = generateSignInInput();
    const { pkey } = await app.get(AuthService).signUp({
      email,
      password,
    });

    const { query, variables } = getUserQuery(pkey);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables,
      })
      .expect(200);

    const body = response.body;
    expect(body).not.toHaveProperty('errors');

    const { user } = body.data;
    expect(user.email).toEqual(email);
    expect(user.pkey).toEqual(pkey);
    expect(user.statistics).toEqual({
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      lostPieces: 0,
    });
    expect(user.match).toEqual([]);
  });

  it('should return not found when pkey is invalid', async () => {
    const { query, variables } = getUserQuery('pkey');

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables,
      })
      .expect(200);

    const body = response.body;
    expect(body).toHaveProperty('errors');
    expect(body.errors[0].message).toEqual('User not found');
  });
});
