export function getSignInMutation(email: string, password: string) {
  return {
    query: `mutation SignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    accessToken,
  }
}`,
    variables: {
      signInInput: {
        email: email,
        password: password,
      },
    },
  };
}
