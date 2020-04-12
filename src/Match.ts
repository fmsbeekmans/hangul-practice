import _ from "lodash";
import { disassemble } from "hangul-js";

export enum Match {
  Matching = "V",
  Mistake = "X",
  Incomplete = "O",
  Pending = " ",
}

export const matchSyllable = (
  actual: string,
  expected: string,
  current: boolean
): Match => {
  if (actual == "") {
    return Match.Pending;
  } else {
    console.log(current);
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
      return current ? Match.Incomplete : Match.Mistake;
    } else {
      return Match.Matching;
    }
  }
};

export interface MatchGroup {
  match: Match;
  characters: string;
}

export const group = (actual: string, expected: string): MatchGroup[] => {
  return _.reduce(
    _.zip(actual.split(""), expected.split("")),
    (acc, [a, e], i) => {
      const match = matchSyllable(a || "", e || "", i == actual.length - 1);
      const prev = _.last(acc);

      if (prev && prev.match == match) {
        const initial = _.dropRight(acc);
        initial.push({
          match: prev.match,
          characters: (prev.characters || "") + (e || ""),
        });

        return initial;
      } else {
        // append new group
        acc.push({
          match: match,
          characters: e,
        });

        return acc;
      }
    },
    []
  );
};
