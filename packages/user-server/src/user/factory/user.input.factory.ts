import { faker } from '@faker-js/faker';
import { UpdateUserInput } from '../input/update-user.input';

export function generateUpdateUserInput(
  nickName?: string,
  firstname?: string,
  lastName?: string,
): UpdateUserInput {
  return {
    nickName: nickName ?? faker.internet.username(),
    firstName: firstname ?? faker.internet.username(),
    lastName: lastName ?? faker.internet.username(),
  };
}
