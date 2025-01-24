export enum MatchResult {
  Black = 'black',
  White = 'white',
  Stalemate = 'stalemate',
}

export enum MatchResultReason {
  Checkmate = 'checkmate',
  Time = 'time',
  Surrender = 'surrender',
  Disconnect = 'disconnect',
}
