# arabic-to-persian

[![Build Status](https://travis-ci.org/Vajehyab/arabic-to-persian.js.svg?branch=master)](https://travis-ci.org/Vajehyab/arabic-to-persian.js)
[![Coverage Status](https://coveralls.io/repos/github/Vajehyab/arabic-to-persian.js/badge.svg?branch=master)](https://coveralls.io/github/Vajehyab/arabic-to-persian.js?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

`arabic-to-persian` is a library to convert arabic text to persian.

## Install

```bash
npm install arabic-to-persian
```

or

```bash
yarn add arabic-to-persian
```

## Usage

In most cases you just need to import `convert` function as bellow:

```javascript
import { convert } from "arabic-to-persian";

const arabic = "ﻭاﮊﻩ";

const persian = "واژه";

console.log(arabic === persian); // false

console.log(convert(arabic) === persian); // true
```

`convert` accepts another argument as `options`.
In this example, you can see how it's possible to set your own `charMap`:

```javascript
import { convert } from "arabic-to-persian";

const arabic = "﷼";

const persian = "ریال";

console.log(arabic === persian); // false

console.log(convert(arabic) === persian); // false

function customConvert(text) {
  const options = { charMap: {} };
  options.charMap[arabic] = persian;
  return convert(text, options);
}

console.log(customConvert(arabic) === persian); // true
```

## Api

See [documentation](https://vajehyab.github.io/arabic-to-persian.js)

## Contributing

See [contributing guide](CONTRIBUTING.md)
