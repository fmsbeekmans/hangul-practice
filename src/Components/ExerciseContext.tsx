import * as React from "react";

import { Exercise } from "../Exercise";
import { KeyboardLayout } from "../KeyboardLayout";

export interface ExerciseContextProps {
  exercise: Exercise;
  progress: string;
  setProgress: (progress: string) => void;
  instruction: string;
  setInstruction: (progress: string) => void;
  keyboardLayout: KeyboardLayout;
}

export const ExerciseContext = React.createContext<ExerciseContextProps | null>(
  null
);
