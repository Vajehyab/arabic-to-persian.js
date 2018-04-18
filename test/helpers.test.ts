import * as Helpers from '../src/helpers'

describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })
})

describe('unicodeOf test', () => {
  it('returns unicode of character', () => {
    expect(Helpers.unicodeOf('٠')).not.toBe('660')
    expect(Helpers.unicodeOf('٠')).toBe('0660')
  })
  it('returns unicode by 4 characters', () => {
    expect(Helpers.unicodeOf('٠')).not.toBe('660')
    expect(Helpers.unicodeOf('٠')).toBe('0660')
  })
})

describe('replaceByCharMap test', () => {
  it('converts text', () => {
    expect(
      Helpers.replaceByCharMap('0123456789ABC', Helpers.PERSIAN_NUMBERS)
    ).toBe('۰۱۲۳۴۵۶۷۸۹ABC')
  })
  it('converts specific chars with custom map', () => {
    expect(Helpers.replaceByCharMap('﷼', { '﷼': 'ریال' })).toBe('ریال')
    expect(Helpers.replaceByCharMap('۵۰ ٪', { '٪': '%' })).toBe('۵۰ %')
  })
})

describe('replaceByUnicodeMap test', () => {
  it('converts text without defaultValue', () => {
    expect(Helpers.replaceByUnicodeMap('ﻭاﮊﻩ', Helpers.UNICODE_MAP)).not.toBe(
      'ﻭاﮊﻩ'
    )
    expect(Helpers.replaceByUnicodeMap('ﻭاﮊﻩ', Helpers.UNICODE_MAP)).toBe(
      'واژه'
    )
  })
  it('converts text with defaultValue', () => {
    expect(
      Helpers.replaceByUnicodeMap('﷼', Helpers.UNICODE_MAP, '***')
    ).not.toBe('ریال')
    expect(Helpers.replaceByUnicodeMap('﷼', Helpers.UNICODE_MAP, '***')).toBe(
      '***'
    )
  })
  it("converts text, but doesn't convert chars with undefined unicode", () => {
    expect(Helpers.replaceByUnicodeMap('۵۰ ٪', Helpers.UNICODE_MAP)).not.toBe(
      '50 %'
    )
    expect(Helpers.replaceByUnicodeMap('۵۰ ٪', Helpers.UNICODE_MAP)).toBe(
      '50 ٪'
    )
  })
  it('converts chars which are used as words in fact', () => {
    expect(Helpers.replaceByUnicodeMap('﷼', { FDFC: 'ریال' })).toBe('ریال')
  })
})

describe('replaceMultiSpacesWithSingleSpace test', () => {
  it('returns text with single space between words', () => {
    expect(
      Helpers.replaceMultiSpacesWithSingleSpace('Hello     world  !  !!   !')
    ).toBe('Hello world ! !! !')
  })
})

describe('preConvert test', () => {
  it('trims text and also replaces multi spaces with one space, when "options" is undefined', () => {
    expect(Helpers.preConvert('  Hello  world  ')).toBe('Hello world')
  })
  it('doesn\'t trim text, but replaces multi spaces with one space, when "options" is { trim: false }', () => {
    expect(Helpers.preConvert('  Hello  world  ', { trim: false })).toBe(
      ' Hello world '
    )
  })
  it('trims text, but doesn\'t replace multi spaces with one space, when "options" is { singleSpace: false }', () => {
    expect(Helpers.preConvert('  Hello  world  ', { singleSpace: false })).toBe(
      'Hello  world'
    )
  })
  it('returns original text, when "options" is { trim: false, singleSpace: false }', () => {
    expect(
      Helpers.preConvert('  Hello  world  ', {
        trim: false,
        singleSpace: false
      })
    ).toBe('  Hello  world  ')
  })
})

describe('postConvert test', () => {
  it('returns original text, when "options" is undefined', () => {
    expect(Helpers.postConvert('se7en')).toBe('se7en')
  })
  it('converts english numbers to persian numbers, when "options" contains { persianNumber: true }', () => {
    expect(Helpers.postConvert('se7en', { persianNumber: true })).toBe('se۷en')
  })
  it('returns converted text, based on char map option', () => {
    const options = {
      charMap: {
        H: 'h',
        E: 'e',
        L: 'l',
        O: 'o',
        W: 'w',
        R: 'r',
        D: 'd',
        '!!!': '!'
      }
    }
    expect(Helpers.postConvert('HELLO WORLD!!!', options)).toBe('hello world!')
  })
})
