import * as React from "react";
import _ from "lodash";
import styled from "styled-components";
import { assemble, disassemble } from "hangul-js";

import { ExerciseContext } from "./ExerciseContext";

import { Match, matchSyllable } from "../Match";
import { Exercise } from "../Exercise";
import { codeToString } from "../KeyboardLayout";

const Char = styled.div`
  font-family: dxlbab;
  font-weight: 300;
  font-size: 60px;
  border-radius: 2px;
  width: 45px;

  vertical-align: center;
  text-align: left;
  color: #444;
`;

export const CompleteChar = styled(Char)`
  color: #bbb;
`;

export const MatchingChar = styled(Char)`
  color: #4b4;
`;

export const MistakeChar = styled(Char)`
  color: #b44;
`;

const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Box = styled.div`
  padding: 20px 16px 0px 16px;
  margin: 2px;
  box-sizing: border-box;

  font-family: "Sunflower", "sans-serif";
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;

  text-align: center;

  border: 1px solid #888;
  border-radius: 2px;
`;

const Current = styled(Box)`
  width: 90px;
  height: 90px;
`
const Target = styled(Box)`
  width: 84px;
  height: 90px;
`
const Disassembled = styled(Box)`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 90px;
`

export const IME: React.FunctionComponent = () => {
  const ctx = React.useContext(ExerciseContext);
  const map = codeToString(ctx.keyboardLayout);

  const progress = (ctx.progress || "").split("")
  const current = progress[ctx.cursor] || ""
  const before = _.take(progress, ctx.cursor).join("")
  const after = _.drop(progress, ctx.cursor + 1).join("")

  const instruction = (ctx.instruction || "").split("")
  const showNextTarget = current == instruction[ctx.cursor]
  const target = instruction[showNextTarget ? ctx.cursor + 1 : ctx.cursor]

  const targetMatch = _.zipWith(
    disassemble(target),
    disassemble(current),
    (expected, actual) => {
      switch (matchSyllable(expected || "", showNextTarget ? "" : actual)) {
        case Match.Matching:
          return <MatchingChar>{expected}</MatchingChar>;
        case Match.Mistake:
          return <MistakeChar>{expected}</MistakeChar>;
        case Match.Incomplete:
        case Match.Pending:
          return <Char>{expected}</Char>
      }
    }
  )

  return (
    <>
      <Input
        tabIndex={0}
        onKeyUp={(e) => {
          e.preventDefault()
          const code = e.nativeEvent.code;
          const mapped: string | undefined = map(e.nativeEvent.code, e.shiftKey);

          if (mapped) {
            const assembled = assemble([...(disassemble(current)), mapped])

            if (assembled.length > 1) {
              ctx.setProgress(before + assembled + after);
              ctx.setCursor(ctx.cursor + assembled.length - 1)
            } else {
              ctx.setProgress(before + assembled + after);
            }
          } else {
            switch (code) {
              case "Backspace":
                let newCursor = ctx.cursor
                if (current == "") {
                  newCursor -= 1
                }
                const start = _.take(progress, ctx.cursor)
                const end = _.drop(progress, ctx.cursor + 1)
                const updated = assemble(_.dropRight(disassemble(progress[newCursor] || "")))
                if (updated == "") {
                  newCursor -= 1
                }

                ctx.setProgress([...start, ...(updated ? [updated] : []), ...end].join(""));
                ctx.setCursor(Math.max(newCursor, 0))

                break;
              case "ArrowLeft":
                ctx.setCursor(ctx.cursor - 1)
                break;
              case "ArrowRight":
                ctx.setCursor(Math.min(ctx.cursor + 1, ctx.progress.length))
                break;
            }
          }
        }}
      >
        <Current>{
          showNextTarget ? (
            <CompleteChar>{current}</CompleteChar>
          ) : ( <Char>{current}</Char> )
            }</Current>
        <Target><Char>{target}</Char></Target>
        <Disassembled>{targetMatch}</Disassembled>
      </Input>
    </>
  );
};
