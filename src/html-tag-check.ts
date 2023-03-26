const NO_CLOSE_TAG_LIST = [
  "br",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "area",
  "base",
  "col",
  "command",
  "embed",
  "keygen",
  "param",
  "source",
  "track",
  "wbr",
];

export type Invalid =
  | {
      type: "invalid_extra_closing_tag";
      detail: [
        {
          type: "closing";
          tag: string;
          index: number;
        }
      ];
    }
  | {
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
  | {
      type: "invalid_extra_opening_tag";
      detail: [
        {
          type: "opening";
          tag: string;
          index: number;
        }
      ];
    };

export type Valid = { type: "valid" };

export type Result = Valid | Invalid;

export const htmlTagCheck = (html: string): Result => {
  const regex =
    /<([a-z][a-z0-9]*)\b[^>]*\/>|<([a-z][a-z0-9]*)\b[^>]*>|<\/([a-z][a-z0-9]*)\s*>/gi;
  const openingStack: RegExpExecArray[] = [];
  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    const selfClosingTag = match[1];
    const openingTag = match[2];
    const closingTag = match[3];

    if (selfClosingTag) {
      continue;
    }

    if (closingTag) {
      if (openingStack.length === 0) {
        return {
          type: "invalid_extra_closing_tag",
          detail: [
            {
              type: "closing",
              tag,
              index: match.index,
            },
          ],
        };
      }
      const lastOpening = openingStack.pop() as RegExpExecArray;

      if (closingTag !== lastOpening[2]) {
        return {
          type: "invalid_mismatch_opening_and_closing_tag",
          detail: [
            {
              type: "opening",
              tag: lastOpening[0],
              index: lastOpening.index,
            },
            {
              type: "closing",
              tag: tag,
              index: match.index,
            },
          ],
        };
      }
    } else {
      if (NO_CLOSE_TAG_LIST.includes(openingTag)) {
        continue;
      }
      openingStack.push(match);
    }
  }

  if (openingStack.length > 0) {
    const extraOpening = openingStack[openingStack.length - 1];
    return {
      type: "invalid_extra_opening_tag",
      detail: [
        {
          type: "opening",
          tag: extraOpening[0],
          index: extraOpening.index,
        },
      ],
    };
  }

  return {
    type: "valid",
  };
};
