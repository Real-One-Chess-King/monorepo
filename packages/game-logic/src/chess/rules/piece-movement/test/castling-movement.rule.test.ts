import { Cell } from "../../../cell";
import { Bishop, King, Queen, Rook } from "../../../piece/pieces";
import { PieceType } from "../../../piece/piece.constants";
import { Color } from "../../../color";
import { Coordinate } from "../../../coordinate";
import { Direction } from "../movement-rule";
import { Action } from "../../../affect/affect.types";
import {
  CastlingMovementRule,
  CastlingMovementRuleConfig,
} from "../castling.rule";
import { TurnType } from "../../../turn";
import { Turn } from "../../../turn";
import { Affects } from "../../../affect/affect.types";
import { MovementRules } from "../movement-rules.const";
import {
  buildMoveAffect,
  markAsUserSelected,
} from "../../../affect/affect.utils";

describe("CastlingMovementRule", () => {
  let rule: CastlingMovementRule;
  let squares: Cell[][];
  const getPiece = (x: number, y: number) => squares[y][x].getPiece();

  let turns: Turn[] = [];

  const getDefaultCells = () => {
    return [
      [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
      ],
    ];
  };
  const updateRule = (
    mainPieceCoordinate: Coordinate = [2, 2],
    foreginPieceCoordinate: Coordinate = [2, 2],
    config?: Partial<CastlingMovementRuleConfig>
  ) => {
    rule = new CastlingMovementRule({
      name: MovementRules.CastlingMovementRule,
      moveToEmpty: true,
      moveToKill: false,
      collision: true,
      distance: 2,
      directions: new Set<Direction>([Direction.Right, Direction.Left]),
      speed: 1,
      ...config,
      color: Color.white,
      mainPieceCoordinate: mainPieceCoordinate,
      foreginPieceCoordinate: foreginPieceCoordinate,
    } as CastlingMovementRuleConfig);
  };

  const checkMoves = (moves: Action[], expectedMoves: Action[]) => {
    expect(moves).toHaveLength(expectedMoves.length);
    expect(moves).toMatchActions(expectedMoves);
  };

  const kingX = 3;
  const kingsRookX = 0;
  const queensRookX = 7;

  const queenX = 4;
  const kingsBishopX = 2;

  function reset() {
    squares = getDefaultCells();
    squares[0][kingsRookX].putPiece(new Rook(Color.white));
    squares[0][queensRookX].putPiece(new Rook(Color.white));
    squares[0][kingX].putPiece(new King(Color.white));
    turns = [];
  }

  const createTurn = (
    pieceType: PieceType,
    from: Coordinate,
    to: Coordinate
  ) => {
    return {
      pieceType,
      color: Color.white,
      affects: [markAsUserSelected(buildMoveAffect(from, to))],
      timestamp: new Date().toISOString(),
      type: TurnType.Move,
    } as Turn;
  };
  const addQueen = () => {
    squares[0][queenX].putPiece(new Queen(Color.white));
  };
  const addKingsBishop = () => {
    squares[0][kingsBishopX].putPiece(new Bishop(Color.white));
  };

  describe("KingSide", () => {
    beforeEach(() => {
      reset();
      // lock another side for tests
      turns.push(
        createTurn(PieceType.Rook, [queensRookX, 0], [queensRookX - 1, 0])
      );
      squares[0][queenX].putPiece(new Queen(Color.white));
      updateRule([kingX, 0], [kingsRookX, 0]);
    });

    it("should return empty moves when king has moved", () => {
      turns.push(createTurn(PieceType.King, [kingX, 0], [kingX - 1, 0]));
      const expectedMoves: Affects[] = [];

      const moves = rule.availableMoves(kingX, 0, getPiece, turns);

      checkMoves(moves, expectedMoves);
    });
    it("should return empty moves when rook has moved", () => {
      turns.push(
        createTurn(PieceType.Rook, [kingsRookX, 0], [kingsRookX + 1, 0])
      );
      const expectedMoves: Affects[] = [];

      const moves = rule.availableMoves(kingX, 0, getPiece, turns);

      checkMoves(moves, expectedMoves);
    });
    it("should return empty moves when cell is between king and rook is locked", () => {
      const expectedMoves: Affects[] = [];

      addKingsBishop();

      const moves = rule.availableMoves(kingX, 0, getPiece, turns);

      checkMoves(moves, expectedMoves);
    });
    it("should return kingside castling available move", () => {
      const kingFrom: Coordinate = [kingX, 0];
      const expectedMoves: Affects[] = [
        [
          markAsUserSelected(buildMoveAffect(kingFrom, [1, 0])),
          buildMoveAffect([kingsRookX, 0], [2, 0]),
        ],
      ];

      const moves = rule.availableMoves(kingX, 0, getPiece, turns);

      checkMoves(moves, expectedMoves);
    });
  });

  describe("QueenSide", () => {
    beforeEach(() => {
      reset();
      turns.push(
        createTurn(PieceType.Rook, [kingsRookX, 0], [kingsRookX + 1, 0])
      );
      squares[0][kingsBishopX].putPiece(new Bishop(Color.white));
      updateRule([kingX, 0], [queensRookX, 0]);
    });

    it("should return empty moves when king has moved", () => {
      turns.push(createTurn(PieceType.King, [kingX, 0], [kingX - 1, 0]));
      const expectedMoves: Affects[] = [];

      const moves = rule.availableMoves(kingX, 0, getPiece, turns);

      checkMoves(moves, expectedMoves);
    });
    it("should return empty moves when rook has moved", () => {
      turns.push(
        createTurn(PieceType.Rook, [queensRookX, 0], [queensRookX + 1, 0])
      );
      const expectedMoves: Affects[] = [];

      const moves = rule.availableMoves(kingX, 0, getPiece, turns);

      checkMoves(moves, expectedMoves);
    });
    it("should return empty moves when cell is between king and rook is locked", () => {
      const expectedMoves: Affects[] = [];

      addQueen();

      const moves = rule.availableMoves(kingX, 0, getPiece, turns);

      checkMoves(moves, expectedMoves);
    });
    it("should return queenside castling available move", () => {
      const expectedMoves: Affects[] = [
        [
          markAsUserSelected(buildMoveAffect([kingX, 0], [5, 0])),
          buildMoveAffect([queensRookX, 0], [4, 0]),
        ],
      ];

      const moves = rule.availableMoves(kingX, 0, getPiece, turns);

      checkMoves(moves, expectedMoves);
    });
  });
});
