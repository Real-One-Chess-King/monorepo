import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { AuthService } from '../../src/auth/auth.service';
import { getSignUpMutation } from '../../src/queries/sign-up.mutation';
import { generateSignInInput } from './../factory/sign-in.input.factory';

jest.setTimeout(5 * 60 * 1000);

describe('Auth resolver > sign up', () => {
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

  it('should return valid jwt after sign up ', async () => {
    const { email, password } = generateSignInInput();
    const { query, variables } = getSignUpMutation(email, password);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables,
      })
      .expect(200);

    const body = response.body;

    expect(body).not.toHaveProperty('errors');
    const token = body.data.signUp.accessToken;
    expect(token).toBeDefined();

    const parsedJwt = await app.get(AuthService).parseJwt(token);

    expect(parsedJwt.email).toEqual(email);
    expect(parsedJwt).toHaveProperty('iat');
    expect(parsedJwt).toHaveProperty('exp');
  });

  it('should return error when user with that email already exist', async () => {
    const { email, password } = generateSignInInput();
    const { query, variables } = getSignUpMutation(email, password);

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables,
      })
      .expect(200);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables,
      })
      .expect(200);

    const body = response.body;

    expect(body).toHaveProperty('errors');
    expect(body.errors[0].message).toEqual('Email already exists');
  });
});
