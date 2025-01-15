# Real one chess king - User server

Contains user auth logic, user's statistic data and reports.

Current auth flow supports only jwt token, with no refresh tokens.

## Local dev

Follow up setup up from the root description. No special steps needed

## Local manual gql testing

1. Open localhost:3000/graphql (if port was reconfigured, update url too).
2. Fill up query and variables, for example

```graphql
mutation SignUp($signUpInput: SignInInput!) {
  signUp(signUpInput: $signUpInput) {
    accessToken
  }
}
```

and variable

```graphql
{"signUpInput": {
        "email": "keke@mail.ru",
        "password": "padredfdf"
}}
```

and then press send!

## Backlog

1. Move mutation function from ./query to shared folder/package for reusing it on Front-end
2. Add email/password format validation test

```

```

```

```
