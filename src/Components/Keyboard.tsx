import * as React from "react";
import styled from "styled-components";

import { KeyboardLayout } from "../KeyboardLayout";
import { filterKeys } from "../Filter";
import { ExerciseContext } from "./ExerciseContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
  margin-top: 2px;
`;

interface KeyProps {
  caption: string;
  nipple: boolean;
}

interface KeyCapProps {
  active: boolean;
}

interface CellProps {
  size?: number;
}

const Cell = styled.div`
  height: 45px;
  flex-basis: 0;
  flex-grow: ${(props: CellProps) => (props && props.size) || 1};
`;

const KeyCap = styled.div`
  background-color: ${(props?: KeyCapProps) =>
    props.active ? "#ddd" : "#fff"};
  border: 1px solid ${(props?: KeyCapProps) => (props.active ? "#444" : "#ddd")};
  border-radius: 2px;
  box-sizing: border-box;
  height: 45px;
  margin: 2px;

  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;

const Nipple = styled.div`
  width: calc(100% - 12px);
  border-bottom: 1px solid
    ${(props: KeyCapProps) => (props.active ? "#444" : "#ddd")};
  height: 1px;
  margin-top: 6px;

  box-sizing: border-box;
`;

const Caption = styled.span`
  padding-top: 15px;
  font-family: "Black Han Sans", sans-serif;
  font-weight: 300;
  color: #444;
`;

const Key: React.FunctionComponent<KeyProps & KeyCapProps> = (props) => (
  <Cell>
    <KeyCap active={props.active}>
      <Caption>{props.caption || ""}</Caption>
      {props.nipple ? <Nipple active={props.active} /> : <></>}
    </KeyCap>
  </Cell>
);

const PaddingKey: React.FunctionComponent<CellProps> = ({ size }) => (
  <Cell size={size}>
    <KeyCap active={false} />
  </Cell>
);



export const Keyboard: React.FunctionComponent = () => {
  const ctx = React.useContext(ExerciseContext);
  const activeKeys = filterKeys(ctx.keyboardLayout, ctx.exercise.filter);

  return (
    <Container>
      {ctx.keyboardLayout.rows.map((row) => (
        <Row>
          {row.keys.map((key) => {
            switch (key.type) {
              case "SymbolKey":
                return (
                  <Key
                    caption={key.lowercase}
                    active={activeKeys.includes(key.lowercase)}
                    nipple={key.nipple}
                  />
                );
              case "Padding":
                return <PaddingKey size={key.size} />;
              case "Placeholder":
                return <PaddingKey size={1} />;
            }
          })}
        </Row>
      ))}
    </Container>
  );
};
