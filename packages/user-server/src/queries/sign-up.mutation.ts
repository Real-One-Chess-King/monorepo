export function getSignUpMutation(email: string, password: string) {
  return {
    query: `mutation SignUp($signUpInput: SignInInput!) {
  signUp(signUpInput: $signUpInput) {
    accessToken,
  }
}`,
    variables: {
      signUpInput: {
        email: email,
        password: password,
      },
    },
  };
}
