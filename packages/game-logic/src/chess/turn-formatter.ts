import { Coordinate } from "./coordinate";

export function fromChessToLogic(coord: string): Coordinate {
  return [7 - coord.charCodeAt(0) + 97, parseInt(coord[1]) - 1];
}

export function fromLogicToChess(x: number, y: number): string {
  return `${String.fromCharCode(97 + (7 - x))}${y + 1}`;
}

export function fromLogicArrayToChess([x, y]: Coordinate): string {
  return `${String.fromCharCode(97 + (7 - x))}${y + 1}`;
}
