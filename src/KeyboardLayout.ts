import _ from "lodash";

export interface Row {
  keys: Key[];
}

export interface SymbolKey {
  type: "SymbolKey";
  lowercase: string;
  uppercase: string;
  code: string;
  nipple?: boolean;
}

export interface Placeholder {
  type: "Placeholder";
}

export interface Padding {
  type: "Padding";
  size: number;
  side: "Left" | "Right";
}

export type Key = SymbolKey | Placeholder | Padding;

export interface KeyboardLayout {
  rows: Row[];
}

const isSymbolKey = (key: Key): boolean => key.type == "SymbolKey";

export const codeToString = (
  keyboardLayout: KeyboardLayout
): ((keyCode: string, shift: boolean) => string | undefined) => {
  const mapping = _(symbolKeys(keyboardLayout))
    .map(key => [key.code, key])
    .fromPairs()
    .value();

  return (code: string, shift: boolean) => {
    if (mapping[code]) {
      return mapping[code][shift ? "uppercase" : "lowercase"];
    } else {
      return undefined;
    }
  };
};

export const symbolKeys = (keyboardLayout: KeyboardLayout): SymbolKey[] =>
  _(keyboardLayout.rows)
    .flatMap(({ keys }) => keys)
    .filter(isSymbolKey)
    .map((key: SymbolKey) => key)
    .value()

export const hangul: KeyboardLayout = {
  rows: [
    {
      keys: [
        {
          type: "Padding",
          size: 0.5,
          side: "Left",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅂ",
          uppercase: "ㅃ",
          code: "KeyQ",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅈ",
          uppercase: "ㅉ",
          code: "KeyW",
        },
        {
          type: "SymbolKey",
          lowercase: "ㄷ",
          uppercase: "ㄸ",
          code: "KeyE",
        },
        {
          type: "SymbolKey",
          lowercase: "ㄱ",
          uppercase: "ㄲ",
          code: "KeyR",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅅ",
          uppercase: "ㅆ",
          code: "KeyT",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅛ",
          uppercase: "ㅛ",
          code: "KeyY",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅕ",
          uppercase: "ㅕ",
          code: "KeyU",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅑ",
          uppercase: "ㅑ",
          code: "KeyI",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅐ",
          uppercase: "ㅒ",
          code: "KeyO",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅔ",
          uppercase: "ㅖ",
          code: "KeyP",
        },
        {
          type: "Placeholder",
        },
        {
          type: "Padding",
          size: 1,
          side: "Right",
        },
      ],
    },
    {
      keys: [
        {
          type: "Padding",
          size: 1,
          side: "Left",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅁ",
          uppercase: "ㅁ",
          code: "KeyA",
        },
        {
          type: "SymbolKey",
          lowercase: "ㄴ",
          uppercase: "ㄴ",
          code: "KeyS",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅇ",
          uppercase: "ㅇ",
          code: "KeyD",
        },
        {
          type: "SymbolKey",
          lowercase: "ㄹ",
          uppercase: "ㄹ",
          code: "KeyF",
          nipple: true,
        },
        {
          type: "SymbolKey",
          lowercase: "ㅎ",
          uppercase: "ㅎ",
          code: "KeyG",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅗ",
          uppercase: "ㅗ",
          code: "KeyH",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅓ",
          uppercase: "ㅓ",
          code: "KeyJ",
          nipple: true,
        },
        {
          type: "SymbolKey",
          lowercase: "ㅏ",
          uppercase: "ㅏ",
          code: "KeyK",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅣ",
          uppercase: "ㅣ",
          code: "KeyL",
        },
        {
          type: "Placeholder",
        },
        {
          type: "Padding",
          size: 1.5,
          side: "Right",
        },
      ],
    },
    {
      keys: [
        {
          type: "Padding",
          size: 1.5,
          side: "Left",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅋ",
          uppercase: "ㅋ",
          code: "KeyZ",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅌ",
          uppercase: "ㅌ",
          code: "KeyX",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅊ",
          uppercase: "ㅊ",
          code: "KeyC",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅍ",
          uppercase: "ㅍ",
          code: "KeyV",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅠ",
          uppercase: "ㅠ",
          code: "KeyB",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅜ",
          uppercase: "ㅜ",
          code: "KeyN",
        },
        {
          type: "SymbolKey",
          lowercase: "ㅡ",
          uppercase: "ㅡ",
          code: "KeyM",
        },
        {
          type: "Placeholder",
        },
        {
          type: "Placeholder",
        },
        {
          type: "Padding",
          size: 2,
          side: "Right",
        },
      ],
    },
  ],
};
