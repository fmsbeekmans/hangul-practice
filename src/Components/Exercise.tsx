import * as React from "react";
import styled from "styled-components";

import { ExerciseContext } from "./ExerciseContext";
import { IME } from "./IME";
import { Instruction } from "./Instruction";
import { Progress } from "./Progress";
import { Keyboard } from "./Keyboard";

const Container = styled.div`
  width: 600px;
  margin: auto;
  border: 1px solid #000;
`;

export const Exercise: React.FunctionComponent = () => {
  const exercise = React.useContext(ExerciseContext);

  return (
    <Container>
      <Instruction />
      <Progress />
      <IME />
      <Keyboard />
    </Container>
  );
};
