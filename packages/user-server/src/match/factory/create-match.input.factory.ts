import { faker } from '@faker-js/faker';
import { CreateMatchInput } from '../input/create-match.input';

export function generateCreateMatchInput(input?: CreateMatchInput) {
  return {
    name: input.name ?? faker.internet.username(),
  };
}
