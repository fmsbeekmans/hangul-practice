import * as React from "react";
import styled from "styled-components";

export const Char = styled.span`
  font-family: "Sunflower", "sans-serif";
  font-weight: 700;
  font-size: 30px;
  line-height: 45px;
  width: 30px;
`;

export const MatchingChar = styled(Char)`
  color: #3a3;
`;

export const MistakeChar = styled(Char)`
  color: #a33;
`;

export const IncompleteChar = styled(Char)`
  color: #666;
`;

export const PendingChar = styled(Char)`
  color: #333;
`;
