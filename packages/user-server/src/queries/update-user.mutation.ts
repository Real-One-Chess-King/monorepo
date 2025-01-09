import { UpdateUserInput } from '../user/input/update-user.input';

export function updateUserMutation({
  nickName,
  firstName,
  lastName,
}: UpdateUserInput) {
  return {
    query: `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(updateUserInput: $input) {
    pkey
    nickName
    firstName
    lastName
  }
}`,
    variables: {
      input: {
        nickName,
        firstName,
        lastName,
      },
    },
  };
}
