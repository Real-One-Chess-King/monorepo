import "jest";
import { Action } from "../src/chess/affect/affect.types";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchActions(expected: Action[]): R;
    }
  }
}
