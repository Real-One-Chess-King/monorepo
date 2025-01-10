import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import * as request from 'supertest';
import { AuthService } from '../../auth/auth.service';
import { getSignInMutation } from '../../queries/sign-in.mutation';
import { generateSignInInput } from '../factory/sign-in.input.factory';

jest.setTimeout(5 * 60 * 1000);

describe('Auth resolver > sign in', () => {
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

  it('should return valid jwt after sign in', async () => {
    const { email, password } = generateSignInInput();

    await app.get(AuthService).signUp({
      email,
      password,
    });

    const { query, variables } = getSignInMutation(email, password);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables,
      })
      .expect(200);

    const body = response.body;

    expect(body).not.toHaveProperty('errors');
    const token = body.data.signIn.accessToken;
    expect(token).toBeDefined();

    const parsedJwt = await app.get(AuthService).parseJwt(token);

    expect(parsedJwt.email).toEqual(email);
    expect(parsedJwt).toHaveProperty('iat');
    expect(parsedJwt).toHaveProperty('exp');
  });

  it('should return error when user doesnt exist', async () => {
    const { email, password } = generateSignInInput();

    const { query, variables } = getSignInMutation(email, password);

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
