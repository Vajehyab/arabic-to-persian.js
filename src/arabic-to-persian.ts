// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

import CHAR_MAP from './char-map'
import PERSIAN_NUMBERS_MAP from './persian-numbers-map'
import UNICODE_MAP from './unicode-map'

export type Char = string

export type CharMap = { [key: string]: string }

export type UnicodeMap = { [key: string]: string }

export type DefaultValue = (c: Char) => string

export interface Options {
  /**
   * @default CHAR_MAP
   */
  charMap?: CharMap

  /**
   * A callback that is called when unicode of character is undefined
   * @default c => c
   */
  defaultValue?: DefaultValue

  /**
   * @default false
   */
  persianNumbers?: boolean

  /**
   * @default true
   */
  singleSpace?: boolean

  /**
   * @default true
   */
  trim?: boolean

  /**
   * @default UNICODE_MAP
   */
  unicodeMap?: UnicodeMap
}

export {
  CHAR_MAP,
  PERSIAN_NUMBERS_MAP,
  UNICODE_MAP,
}

export function unicodeOf(c: string) {
  let result = c
    .charCodeAt(0)
    .toString(16)
    .toUpperCase()
  if (result.length === 3) {
    result = `0${result}`
  }
  return result
}

export function replaceByCharMap(text: string, map: CharMap) {
  let result = text
  const replace = Object.keys(map)
  const by = Object.values(map)
  for (let i = 0; i < replace.length; i++) {
    result = result.replace(new RegExp(replace[i], 'g'), by[i])
  }
  return result
}

export function replaceByUnicodeMap(
  text: string,
  map: UnicodeMap,
  defaultValue: DefaultValue = (c: Char) => c
) {
  return text
    .split('')
    .map(c => map[unicodeOf(c)] || defaultValue(c))
    .join('')
}

export function replaceMultiSpacesWithSingleSpace(text: string) {
  return text.replace(/ +(?= )/g, '')
}

export function convert(text: string, options: Options = {}) {
  const {
    charMap = CHAR_MAP,
    defaultValue,
    persianNumbers = false,
    singleSpace = true,
    trim = true,
    unicodeMap = UNICODE_MAP,
  } = options

  let result = text

  if (trim) {
    result = result.trim()
  }

  if (singleSpace) {
    result = replaceMultiSpacesWithSingleSpace(result)
  }

  result = replaceByUnicodeMap(result, unicodeMap, defaultValue)

  result = replaceByCharMap(result, charMap)

  if (persianNumbers) {
    result = replaceByCharMap(result, PERSIAN_NUMBERS_MAP)
  }

  return result
}
