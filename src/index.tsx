import * as React from "react";
import * as ReactDOM from "react-dom";
import _ from "lodash";

import { App } from "./App";
import { randomSyllable} from "./Exercise";
import { Filter, homeRow, topRow, lowercaseOnly } from "./Filter";
import { hangul } from "./KeyboardLayout";
import { Exercise } from "./Components/Exercise";

const f1 = _.fromPairs(_.map(topRow, (code) => [code, lowercaseOnly]))
const f2 = _.fromPairs(_.map(homeRow, (code) => [code, lowercaseOnly]))


ReactDOM.render(
  <App
    exercise={{
      filter: f1,
      gen: randomSyllable(hangul),
    }}
    keyboardLayout={hangul}
    size={9}
  >
    <Exercise />
  </App>,
  document.getElementById("example")
);
