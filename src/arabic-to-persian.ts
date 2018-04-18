// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

import * as Helpers from './helpers'

export const UNICODE_MAP = Helpers.UNICODE_MAP

export const unicodeOf = Helpers.unicodeOf

export function convert(text: string, options: Helpers.Options = {}) {
  const { unicodeMap = Helpers.UNICODE_MAP, defaultValue } = options
  return Helpers.postConvert(
    Helpers.replaceByUnicodeMap(
      Helpers.preConvert(text, options),
      unicodeMap,
      defaultValue
    ),
    options
  )
}
