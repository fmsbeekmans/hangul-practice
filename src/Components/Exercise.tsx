import * as React from "react";
import styled from "styled-components";

import { ExerciseContext } from "./ExerciseContext";
import { Input } from "./Input";
import { Instruction } from "./Instruction";
import { Keyboard } from "./Keyboard";

const Container = styled.div`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 45px;
`;

export const Exercise: React.FunctionComponent = () => {
  const exercise = React.useContext(ExerciseContext);

  return (
    <Container>
      <Instruction />
      <Input />
      <Keyboard />
    </Container>
  );
};
