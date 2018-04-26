import * as Api from '../src/arabic-to-persian'

describe('Dummy', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })
})

describe('unicodeOf', () => {
  it('returns unicode of character', () => {
    expect(Api.unicodeOf('٠')).not.toBe('660')
    expect(Api.unicodeOf('٠')).toBe('0660')
  })
  it('returns unicode by 4 characters', () => {
    expect(Api.unicodeOf('٠')).not.toBe('660')
    expect(Api.unicodeOf('٠')).toBe('0660')
  })
})

describe('replaceByCharMap', () => {
  it('converts text', () => {
    expect(Api.replaceByCharMap('0123456789ABC', Api.PERSIAN_NUMBERS_MAP)).toBe('۰۱۲۳۴۵۶۷۸۹ABC')
  })
  it('converts specific chars with custom map', () => {
    expect(Api.replaceByCharMap('﷼', { '﷼': 'ریال' })).toBe('ریال')
    expect(Api.replaceByCharMap('۵۰ ٪', { '٪': '%' })).toBe('۵۰ %')
  })
})

describe('replaceByUnicodeMap', () => {
  it('converts text without defaultValue', () => {
    expect(Api.replaceByUnicodeMap('ﻭاﮊﻩ', Api.UNICODE_MAP)).not.toBe('ﻭاﮊﻩ')
    expect(Api.replaceByUnicodeMap('ﻭاﮊﻩ', Api.UNICODE_MAP)).toBe('واژه')
  })
  it('converts text with defaultValue', () => {
    expect(Api.replaceByUnicodeMap('﷼', Api.UNICODE_MAP, () => '***')).not.toBe('ریال')
    expect(Api.replaceByUnicodeMap('﷼', Api.UNICODE_MAP, () => '***')).toBe('***')
  })
  it("converts text but doesn't convert chars with undefined unicode", () => {
    expect(Api.replaceByUnicodeMap('۵۰ ٪', Api.UNICODE_MAP)).not.toBe('50 %')
    expect(Api.replaceByUnicodeMap('۵۰ ٪', Api.UNICODE_MAP)).toBe('50 ٪')
  })
  it('converts chars which are used as words in fact', () => {
    expect(Api.replaceByUnicodeMap('﷼', { FDFC: 'ریال' })).toBe('ریال')
  })
})

describe('replaceMultiSpacesWithSingleSpace', () => {
  it('returns text with single space between words', () => {
    expect(Api.replaceMultiSpacesWithSingleSpace('Hello     world  !  !!   !')).toBe('Hello world ! !! !')
  })
})

describe('createConverter', () => {
  it('returns convertor function', () => {
    const ar2fa = Api.createConverter()
    expect(ar2fa('ﻭاﮊﻩ')).toBe('واژه')
  })
})

describe('convert', () => {
  it('works with "charMap" option', () => {
    expect(Api.convert('﷼', { charMap: {} })).toBe('﷼')
    expect(Api.convert('﷼', { charMap: { '﷼': 'ریال' } })).toBe('ریال')
  })
  it('works with "defaultValue" option', () => {
    expect(Api.convert('﷼')).toBe('﷼')
    expect(Api.convert('﷼', { defaultValue: () => "***" })).toBe('***')
  })
  it('works with "persianNumbers" option', () => {
    expect(Api.convert('se7en', { persianNumbers: true })).toBe('se۷en')
    expect(Api.convert('se7en', { persianNumbers: false })).toBe('se7en')
  })
  it('works with "singleSpace" option', () => {
    expect(Api.convert('Hello  World', { singleSpace: true })).toBe('Hello World')
    expect(Api.convert('Hello  World', { singleSpace: false })).toBe('Hello  World')
  })
  it('works with "trim" option', () => {
    expect(Api.convert(' Hi ', { trim: true })).toBe('Hi')
    expect(Api.convert(' Hi ', { trim: false })).toBe(' Hi ')
  })
  it('works with "unicodeMap" option', () => {
    expect(Api.convert('﷼', { unicodeMap: {} })).toBe('﷼')
    expect(Api.convert('﷼', { unicodeMap: { FDFC: 'ریال' } })).toBe('ریال')
  })
})
