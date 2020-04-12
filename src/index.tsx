import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";
import { Filter, filterKeys, randomSyllable } from "./Exercise";
import { RowName, Section, hangul } from "./KeyboardLayout";
import { Exercise } from "./Components/Exercise";

const f: Filter = {
  lowercase: true,
  uppercase: false,
  sections: [Section.LeftHand, Section.Middle, Section.RightHand],
  rows: [RowName.HomeRow],
};

ReactDOM.render(
  <App
    exercise={{
      filter: f,
      gen: randomSyllable(hangul),
    }}
    keyboardLayout={hangul}
    size={10}
  >
    <Exercise />
  </App>,
  document.getElementById("example")
);
