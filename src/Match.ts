import _ from "lodash";
import { disassemble } from "hangul-js";

export enum Match {
  Matching = "V",
  Mistake = "X",
  Incomplete = "O",
  Pending = " ",
}

export const matchSyllable = (expected: string, actual: string): Match => {
  if (!actual || actual == "") {
    return Match.Pending;
  } else {
    const byLetter = _.zipWith(
      disassemble(actual),
      disassemble(expected),
      (a, e) => {
        if (a) {
          if (e === a) {
            return Match.Matching;
          } else {
            return Match.Mistake;
          }
        } else {
          return Match.Incomplete;
        }
      }
    );

    if (byLetter.includes(Match.Mistake)) {
      return Match.Mistake;
    } else if (byLetter.includes(Match.Incomplete)) {
      return Match.Incomplete;
    } else {
      return Match.Matching;
    }
  }
};
