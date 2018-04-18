export type Map = { [key: string]: string }

export interface Options {
  charMap?: Map

  defaultValue?: string

  /**
   * @default false
   */
  persianNumber?: boolean

  /**
   * @default true
   */
  singleSpace?: boolean

  /**
   * @default true
   */
  trim?: boolean

  unicodeMap?: Map
}

export const UNICODE_MAP = require('./unicode-map.json') as Map

export const PERSIAN_NUMBERS = {
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹'
} as Map

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

export function replaceByCharMap(text: string, map: Map) {
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
  map: Map,
  defaultValue?: string
) {
  return text
    .split('')
    .map(c => map[unicodeOf(c)] || defaultValue || c)
    .join('')
}

export function replaceMultiSpacesWithSingleSpace(text: string) {
  return text.replace(/ +(?= )/g, '')
}

export function preConvert(
  text: string,
  { trim = true, singleSpace = true }: Options = {}
) {
  const result = trim ? text.trim() : text
  return singleSpace ? replaceMultiSpacesWithSingleSpace(result) : result
}

export function postConvert(
  text: string,
  { charMap = {}, persianNumber = false }: Options = {}
) {
  const result = replaceByCharMap(text, charMap)
  return !persianNumber ? result : replaceByCharMap(result, PERSIAN_NUMBERS)
}
