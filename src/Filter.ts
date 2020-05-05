import _ from "lodash";
import { assemble, disassemble } from "hangul-js";

import { allSyllables } from "./Hangul";
import { KeyboardLayout, symbolKeys } from "./KeyboardLayout";

export interface Key {
  lowercase: boolean;
  uppercase: boolean;
}

export interface Filter {
  [code: string]: Key
}

export const lowercaseOnly = {
  lowercase: true,
  uppercase: false
}

export const uppercaseOnly = {
  lowercase: false,
  uppercase: true
}

export const bothEnabled = {
  lowercase: true,
  uppercase: true
}

export const topRow = [
  "KeyQ",
  "KeyW",
  "KeyE",
  "KeyR",
  "KeyT",
  "KeyY",
  "KeyU",
  "KeyI",
  "KeyO",
  "KeyP"
]

export const homeRow = [
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyJ",
  "KeyK",
  "KeyL"
]

export const filterKeys = (
  keyboardLayout: KeyboardLayout,
  filter: Filter
): string[] => {
  return _(symbolKeys(keyboardLayout))
    .flatMap(key => {
      const filterKey = filter[key.code]

      if (filterKey) {
        return [ 
          ...(filterKey.lowercase ? [ key.lowercase ] : []),
          ...(filterKey.uppercase ? [ key.uppercase ] : [])
        ]
      } else {
        return []
      }
    }).value()
}
