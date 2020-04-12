import _ from "lodash";
import { assemble, disassemble } from "hangul-js";

import * as KeyboardLayout from "./KeyboardLayout";

export interface Filter {
  lowercase: boolean;
  uppercase: boolean;
  sections: KeyboardLayout.Section[];
  rows: KeyboardLayout.RowName[];
}

export interface Exercise {
  filter: Filter;
  gen: (filter: Filter) => () => string;
}

export const filterKeys = (
  keyboardLayout: KeyboardLayout.KeyboardLayout,
  filter: Filter
): string[] => {
  return _(keyboardLayout.rows)
    .filter(({ row }) => filter.rows.includes(row))
    .flatMapDeep((row) => {
      const keys = _(row.keys)
        .filter((key) => {
          switch (key.type) {
            case "SymbolKey":
              return filter.sections.includes(key.section);
            default:
              return false;
          }
        })
        .value();

      return [
        filter.lowercase ? _.flatMap(keys, (key) => lowercase(key)) : [],
        filter.uppercase ? _.flatMap(keys, uppercase) : [],
      ];
    })
    .uniq()
    .value();
};

const lowercase = (key: KeyboardLayout.Key): string[] => {
  switch (key.type) {
    case "SymbolKey":
      return [key.lowercase];
    default:
      return [];
  }
};

const uppercase = (key: KeyboardLayout.Key): string[] => {
  switch (key.type) {
    case "SymbolKey":
      return [key.uppercase];
    default:
      return [];
  }
};

export const randomSyllable = (
  keyboardLayout: KeyboardLayout.KeyboardLayout
): ((filter: Filter) => () => string) => {
  const consonants = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅎ";
  const doubleEndConsonants = "ㄳㄵㄶㄺㄻㄼㄽㄾㄿㅀㅄ";
  const vowels = "ㅏㅐㅑㅒㅓㅔㅕㅖㅣㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";

  return (filter) => {
    const characters = filterKeys(keyboardLayout, filter);

    const filteredConsonants = _.filter(consonants.split(""), (c) =>
      characters.includes(c)
    );
    const filteredDoubleEndConsonants = _.filter(
      doubleEndConsonants.split(""),
      (c) => _.every(disassemble(c), (cc) => characters.includes(cc))
    );
    const filteredVowels = _.filter(vowels.split(""), (v) =>
      _.every(disassemble(v), (vc) => characters.includes(vc))
    );
    const endConsonant: (() => string[])[] = [
      () => [],
      () => _.sampleSize(filteredConsonants, 1),
      () => _.sampleSize(filteredDoubleEndConsonants, 1),
    ];

    const vowelsAvailable = filteredVowels.length > 0;

    return () => {
      const start = _.sampleSize(filteredConsonants, 1);
      const vowel = _.sampleSize(filteredVowels, 1);
      const end = vowelsAvailable
        ? endConsonant[_.sample([0, 0, 0, 0, 1, 1, 1, 2])]()
        : [];

      return assemble([...start, ...vowel, ...end]);
    };
  };
};
