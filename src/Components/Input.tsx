import * as React from "react";
import _ from "lodash";
import styled from "styled-components";

import { Exercise } from "../Exercise";
import { ExerciseContext } from "./ExerciseContext";

const Component = styled.input`
  padding: 0;
  margin-left: 2px;
  margin-right: 2px;
  box-sizing: border-box;
  width: calc(100% - 4px);

  border: 1px solid #444;
  border-radius: 2px;

  font-family: "Sunflower", "sans-serif";
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
`;

export const Input: React.FunctionComponent = () => {
  const exercise = React.useContext(ExerciseContext);

  return (
    <>
      <Component
        type="text"
        onChange={(e) => exercise.setProgress(e.currentTarget.value)}
      />
    </>
  );
};
