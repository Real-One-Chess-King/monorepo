import { faker } from '@faker-js/faker';

export function generateSignInInput(email?: string, password?: string) {
  return {
    email: email ?? faker.internet.email(),
    password: password ?? faker.internet.password(),
  };
}
