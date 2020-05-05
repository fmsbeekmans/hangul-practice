import * as React from "react";
import _ from "lodash";
import styled from "styled-components";

import { Exercise } from "../Exercise";
import { ExerciseContext } from "./ExerciseContext";
import { Match, matchSyllable } from "../Match";

export interface CharProps {
  isCursor: boolean;
}

export const Char = styled.div`
  height: 36px;
  width: 26px;
  padding: 5px 3px 0px 3px;
  border-radius: 2px;

  font-family: dxlbab;
  font-weight: 800;
  font-size: 26px;
  ${({ isCursor }: CharProps) => (isCursor ? "background-color: #ddd;" : "")}
  text-align: center;
  vertical-align: center;
`;

export const MatchingChar = styled(Char)`
  color: #4b4;
`;

export const MistakeChar = styled(Char)`
  color: #b44;
`;

export const IncompleteChar = styled(Char)`
  color ${({ isCursor }: CharProps) => (isCursor ? "#444" : "#444")};
`;

export const PendingChar = styled(Char)`
  color ${({ isCursor }: CharProps) => (isCursor ? "#444" : "#bbb")};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 3px;

  width: calc(100% - 12px);
  margin: 4px 2px;
  height: 41px;
  max-height: 135px;
  border: 1px solid #888;
  border-radius: 2px;
`;

export interface TextBarProps {
  chars: string[]
  matches: Match[]
  cursor?: number
}

export const TextBar: React.FunctionComponent<TextBarProps> = ({
  chars,
  matches,
  cursor,
}) => {

  const styledChars = _.map(
    _.zip(chars, matches),
    ([c, m], i) => {
      const isCursor = cursor != null ? i == cursor : false

      switch (m) {
        case Match.Matching:
          return <MatchingChar isCursor={isCursor}>{c}</MatchingChar>;
        case Match.Mistake:
          return <MistakeChar isCursor={isCursor}>{c}</MistakeChar>;
        case Match.Incomplete:
          return (
            <IncompleteChar isCursor={isCursor}>{c}</IncompleteChar>
          );
        case Match.Pending:
          return <PendingChar isCursor={isCursor}>{c}</PendingChar>;
      }
    }
  );

  return <Container>{styledChars}</Container>;
};
