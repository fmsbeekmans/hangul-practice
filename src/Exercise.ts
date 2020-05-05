import _ from "lodash";
import { assemble, disassemble } from "hangul-js";

import { allSyllables } from "./Hangul";
import { Filter, filterKeys } from "./Filter";
import * as KeyboardLayout from "./KeyboardLayout";

export interface Exercise {
  filter: Filter;
  gen: (filter: Filter) => () => string;
}

export const randomSyllable = (
  keyboardLayout: KeyboardLayout.KeyboardLayout
): ((filter: Filter) => () => string) => {

  return (filter) => {
    const availableCharacters = filterKeys(keyboardLayout, filter);

    const availableSyllables: string[] =
      _(allSyllables).filter((s) =>
        _.every(
          disassemble(s),
          a => availableCharacters.includes(a)
        )
      ).value()

    return () => _.sample(availableSyllables)
  };
};
