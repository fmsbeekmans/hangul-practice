import * as React from "react";
import _ from "lodash";

import { ExerciseContext } from "./Components/ExerciseContext";
import { Exercise } from "./Exercise";
import { KeyboardLayout } from "./KeyboardLayout";

export interface AppProps {
  exercise: Exercise;
  keyboardLayout: KeyboardLayout;
  size: number;
}

export const App: React.FunctionComponent<AppProps> = (props) => {
  const genBatch = (): string =>
    _.times(props.size, props.exercise.gen(props.exercise.filter)).join("");

  const [progress, setProgress] = React.useState("");
  const [instruction, setInstruction] = React.useState(genBatch() + genBatch());
  const [cursor, setCursor] = React.useState(0);

  const updateProgress = (str: string): void => {
    setProgress(str);

    //    if (progress.length + props.size == instruction.length) {
    //      setInstruction(instruction + genBatch());
    //    }
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercise: props.exercise,
        progress: progress,
        setProgress: updateProgress,
        cursor: cursor,
        setCursor: setCursor,
        instruction: instruction,
        setInstruction: setInstruction,
        keyboardLayout: props.keyboardLayout,
      }}
    >
      {props.children}
    </ExerciseContext.Provider>
  );
};
