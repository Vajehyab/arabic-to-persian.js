# arabic-to-persian

`arabic-to-persian` is a library to convert arabic text to persian.

## Install

```command
npm install arabic-to-persian
```

or

```command
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

## Options

| Name           | Type                      | Default Value | Description |
| -------------- | ------------------------- | ------------- | ----------- |
| `charMap`      | { [key: Char]: Char }     | {}            |             |
| `defaultValue` | Char                      | --            |             |
| `persianNumber`| boolean                   | false         |             |
| `singleSpace`  | boolean                   | true          |             |
| `trim`         | boolean                   | true          |             |
| `unicodeMap`   | { [key: Unicode]: Char }  | UNICODE_MAP   |             |
