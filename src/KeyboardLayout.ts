export enum Section {
  LeftOutside,
  LeftHand,
  Middle,
  RightHand,
  RightOutside,
}

export enum RowName {
  TopRow,
  HomeRow,
  BottomRow,
}

export interface Row {
  leftOffset: number;
  rightOffset: number;
  row: RowName;
  keys: Key[];
}

export interface SymbolKey {
  type: "SymbolKey";
  section: Section;
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

export const hangul: KeyboardLayout = {
  rows: [
    {
      leftOffset: 0.5,
      rightOffset: 1,
      row: RowName.TopRow,
      keys: [
        {
          type: "Padding",
          size: 0.5,
          side: "Left"
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㅂ",
          uppercase: "ㅃ",
          code: "KeyQ",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㅈ",
          uppercase: "ㅉ",
          code: "keyW",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㄷ",
          uppercase: "ㄸ",
          code: "keyE",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㄱ",
          uppercase: "ㄲ",
          code: "keyR",
        },
        {
          type: "SymbolKey",
          section: Section.Middle,
          lowercase: "ㅅ",
          uppercase: "ㅆ",
          code: "keyT",
        },
        {
          type: "SymbolKey",
          section: Section.Middle,
          lowercase: "ㅛ",
          uppercase: "ㅛ",
          code: "keyY",
        },
        {
          type: "SymbolKey",
          section: Section.RightHand,
          lowercase: "ㅕ",
          uppercase: "ㅕ",
          code: "keyU",
        },
        {
          type: "SymbolKey",
          section: Section.RightHand,
          lowercase: "ㅑ",
          uppercase: "ㅑ",
          code: "keyI",
        },
        {
          type: "SymbolKey",
          section: Section.RightHand,
          lowercase: "ㅐ",
          uppercase: "ㅒ",
          code: "keyO",
        },
        {
          type: "SymbolKey",
          section: Section.RightHand,
          lowercase: "ㅔ",
          uppercase: "ㅖ",
          code: "keyP",
        },
        {
          type: "Placeholder"
        },
        {
          type: "Padding",
          size: 1,
          side: "Right"
        },
      ],
    },
    {
      leftOffset: 1,
      rightOffset: 1.5,
      row: RowName.HomeRow,
      keys: [
        {
          type: "Padding",
          size: 1,
          side: "Left"
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㅁ",
          uppercase: "ㅁ",
          code: "KeyA",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㄴ",
          uppercase: "ㄴ",
          code: "keyS",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㅇ",
          uppercase: "ㅇ",
          code: "keyD",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㄹ",
          uppercase: "ㄹ",
          code: "keyF",
          nipple: true,
        },
        {
          type: "SymbolKey",
          section: Section.Middle,
          lowercase: "ㅎ",
          uppercase: "ㅎ",
          code: "keyG",
        },
        {
          type: "SymbolKey",
          section: Section.Middle,
          lowercase: "ㅗ",
          uppercase: "ㅗ",
          code: "keyH",
        },
        {
          type: "SymbolKey",
          section: Section.RightHand,
          lowercase: "ㅓ",
          uppercase: "ㅓ",
          code: "keyJ",
          nipple: true,
        },
        {
          type: "SymbolKey",
          section: Section.RightHand,
          lowercase: "ㅏ",
          uppercase: "ㅏ",
          code: "keyK",
        },
        {
          type: "SymbolKey",
          section: Section.RightHand,
          lowercase: "ㅣ",
          uppercase: "ㅣ",
          code: "keyL",
        },
        {
          type: "Placeholder"
        },
        {
          type: "Padding",
          size: 1.5,
          side: "Right"
        },
      ],
    },
    {
      leftOffset: 1.5,
      rightOffset: 3,
      row: RowName.BottomRow,
      keys: [
        {
          type: "Padding",
          size: 1.5,
          side: "Left"
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㅋ",
          uppercase: "ㅋ",
          code: "KeyZ",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㅌ",
          uppercase: "ㅌ",
          code: "keyX",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㅊ",
          uppercase: "ㅊ",
          code: "keyC",
        },
        {
          type: "SymbolKey",
          section: Section.LeftHand,
          lowercase: "ㅍ",
          uppercase: "ㅍ",
          code: "keyV",
        },
        {
          type: "SymbolKey",
          section: Section.Middle,
          lowercase: "ㅠ",
          uppercase: "ㅠ",
          code: "keyB",
        },
        {
          type: "SymbolKey",
          section: Section.Middle,
          lowercase: "ㅜ",
          uppercase: "ㅜ",
          code: "keyN",
        },
        {
          type: "SymbolKey",
          section: Section.RightHand,
          lowercase: "ㅡ",
          uppercase: "ㅡ",
          code: "keyM",
        },
        {
          type: "Placeholder"
        },
        {
          type: "Placeholder"
        },
        {
          type: "Padding",
          size: 1,
          side: "Right"
        },
      ],
    },
  ],
};
