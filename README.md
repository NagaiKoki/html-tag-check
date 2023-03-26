## Introduction

This library enable to check html tag whether html is missed opening or closing tags by TypeScript

## Installation

You can use this from Node.js or JavaScript whatever.

```shell
npm install html-tag-check # npm
yarn add html-tag-check # yarn
pnpm add html-tag-check # pnpm
```

## How to use

```ts
import { htmlTagCheck } from "html-tag-check";

const HTML = "<div><p>Opening div tag isn't necessary!!</p>";
htmlTagCheck(HTML);
// => { type: "invalid_extra_opening_tag", detail: { type: "opening", tag: "<div>", index: 0 } }
```

#### Arguments

| Name      | Type     | Required | Description            |
| --------- | -------- | -------- | ---------------------- |
| `html`    | `string` | true     | html you want to check |
| `options` | `object` | false    | the options of checker |

##### options

| Name       | Type      | Required | Description                                        |
| ---------- | --------- | -------- | -------------------------------------------------- |
| `trimHtml` | `boolean` | false    | remove new lines and white spaces from html string |

#### Return

##### Valid

```ts
{
  type: "valid";
}
```

##### Invalid

###### extra closing tag error

```ts
{
  type: "invalid_extra_closing_tag";
  detail: [
    {
      type: "closing"; // closing tag error
      tag: string; // tag name like </div>
      index: number; // tag index number from html string.
    }
  ];
}
```

###### mismatch opening and closing tag error

```ts
{
  type: "invalid_mismatch_opening_and_closing_tag";
  detail: [
    {
      type: "opening";
      tag: string;
      index: number;
    },
    {
      type: "closing";
      tag: string;
      index: number;
    }
  ];
}
```

###### extra opening tag error

```ts
{
  type: "invalid_extra_opening_tag";
  detail: [
    {
      type: "opening";
      tag: string;
      index: number;
    }
  ];
};
```
