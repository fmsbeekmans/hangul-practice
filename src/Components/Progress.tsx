import * as React from "react";
import _ from "lodash";

import { Exercise } from "../Exercise";
import { Match, matchSyllable } from "../Match";

import { ExerciseContext } from "./ExerciseContext";
import { TextBar } from "./TextBar";

export const Progress: React.FunctionComponent = () => {
  const ctx = React.useContext(ExerciseContext);

  const matches = _.zipWith(
    ctx.instruction.split(""),
    ctx.progress.split(""),
    matchSyllable
  );

  return (
    <TextBar
      chars={ctx.progress.split("")}
      matches={matches}
      cursor={ctx.cursor}
    />
  )
};
