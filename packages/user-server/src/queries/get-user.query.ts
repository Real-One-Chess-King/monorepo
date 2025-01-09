export function getUserQuery(pkey: string) {
  return {
    query: `query GetUserById($pkey: String!) {
  user(pkey: $pkey) {
    pkey
    email
    nickname
    firstName
    lastName
    mmr
    statistics {
      gamesPlayed
      wins
      losses
      lostPieces
    }
  }
}`,
    variables: {
      pkey,
    },
  };
}
