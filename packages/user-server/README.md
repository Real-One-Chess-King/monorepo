# Real one chess king - User server

Contains user auth logic, user's statistic data and reports.

Current auth flow supports only jwt token, with no refresh tokens.

## Local dev

fill up `.env` file and run docker-compose from root

## Backlog

1. Move mutation function from ./query to shared folder/package for reusing it on Front-end
2. Add email/password format validation test
