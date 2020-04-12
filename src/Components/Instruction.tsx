import * as React from "react";
import _ from "lodash";
import styled from "styled-components";

import { Exercise } from "../Exercise";
import { MatchingChar, MistakeChar, IncompleteChar, PendingChar } from "./Char";
import { ExerciseContext } from "./ExerciseContext";
import { Match, group } from "../Match";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-left: 9px;
  padding-right: 9px;
  height: 135px;
  max-height: 135px;
  overflow-y: hidden;
`;

const Fade = styled.div`
  position: absolute;
  top: 0;
  width: calc(100% - 18px);
  height: 45px;

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
`;

const Text = styled.div`
  position: absolute;
  bottom: 0px;
  padding-bottom: 22.5px;
  overflow-y: hidden;
`;

export const Instruction: React.FunctionComponent = () => {
  const ctx = React.useContext(ExerciseContext);

  return (
    <Container>
      <Text>
        {_.map(group(ctx.progress, ctx.instruction), (group, i) => {
          if (group.match == Match.Matching) {
            return <MatchingChar key={i}>{group.characters}</MatchingChar>;
          } else if (group.match == Match.Mistake) {
            return <MistakeChar key={i}>{group.characters}</MistakeChar>;
          } else if (group.match == Match.Incomplete) {
            return <IncompleteChar key={i}>{group.characters}</IncompleteChar>;
          } else {
            return <PendingChar key={i}>{group.characters}</PendingChar>;
          }
        })}
      </Text>
      <Fade />
    </Container>
  );
};
