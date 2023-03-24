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
