import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { AuthService } from '../../src/auth/auth.service';
import { generateSignInInput } from '../factory/sign-in.input.factory';
import { generateUpdateUserInput } from '../factory/user.input.factory';
import { updateUserMutation } from '../../src/queries/update-user.mutation';

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
    const { accessToken, pkey } = await app.get(AuthService).signUp({
      email,
      password,
    });

    const userUpdateInput = generateUpdateUserInput();

    const { query, variables } = updateUserMutation(userUpdateInput);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query,
        variables,
      })
      .expect(200);

    const body = response.body;
    expect(body).not.toHaveProperty('errors');

    const { updateUser } = body.data;
    expect(updateUser.pkey).toEqual(pkey);
    expect(updateUser.firstName).toEqual(userUpdateInput.firstName);
    expect(updateUser.lastName).toEqual(userUpdateInput.lastName);
    expect(updateUser.nickName).toEqual(userUpdateInput.nickName);
  });

  it('should return unauthorised error when jwt is not provided', async () => {
    const userUpdate = generateUpdateUserInput();

    const { query, variables } = updateUserMutation(userUpdate);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables,
      })
      .expect(200);

    const body = response.body;
    expect(body).toHaveProperty('errors');
    expect(body.errors[0].message).toEqual('Unauthorized');
  });
});
