import { buildMoveAffect, markAsUserSelected } from "../../affect/affect.utils";
import { Direction } from "./movement-rule";
import { Action } from "../../affect/affect.types";
import {
  directionToVector,
  StraightMovementRule,
  StraightMovementRuleConfig,
} from "./straight-movement.rule";

export class VerticalMovementRule extends StraightMovementRule {
  constructor({
    id,
    name,
    moveToEmpty,
    moveToKill,
    collision,
    distance,
    directions,
    speed = 1,
  }: StraightMovementRuleConfig) {
    super(
      id,
      name,
      moveToEmpty,
      moveToKill,
      collision,
      distance,
      directions,
      speed
    );
  }

  protected possibleDirrections = [Direction.Up, Direction.Down];
  protected calculateNewCoord = (
    x: number,
    y: number,
    diff: number,
    dirrection: Direction
  ): Action => {
    return [
      markAsUserSelected(
        buildMoveAffect([x, y], directionToVector(dirrection, x, y, diff))
      ),
    ];
  };
}
