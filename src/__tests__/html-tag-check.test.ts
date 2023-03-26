import { htmlTagCheck } from "../html-tag-check";

type Return = ReturnType<typeof htmlTagCheck>;

describe("htmlTagCheck", () => {
  describe("If no tag errors exist in html", () => {
    const html = "<!DOCTYPE><body><p>test</p></body>";

    test("return valid type", () => {
      expect(htmlTagCheck(html)).toStrictEqual<Return>({
        type: "valid",
      });
    });
  });

  describe("If an extra closing tag is present", () => {
    const html = "<!DOCTYPE><body><p>test</p></body></p>";
    test("return invalid_extra_closing_tag type and extra closing tag name", () => {
      expect(htmlTagCheck(html)).toStrictEqual<Return>({
        type: "invalid_extra_closing_tag",
        detail: [
          {
            type: "closing",
            tag: "</p>",
            index: 34,
          },
        ],
      });
    });
  });

  describe("If the start and closing tags do not match", () => {
    const html = "<!DOCTYPE><body><p>test</p></p></body>";
    test("return invalid_mismatch_opening_and_closing_tag type and mismatched openingTag and closing tag name", () => {
      expect(htmlTagCheck(html)).toStrictEqual<Return>({
        type: "invalid_mismatch_opening_and_closing_tag",
        detail: [
          {
            type: "opening",
            tag: "<body>",
            index: 10,
          },
          {
            type: "closing",
            tag: "</p>",
            index: 27,
          },
        ],
      });
    });
  });

  describe("If an extra start tag is present", () => {
    const html = "<p><!DOCTYPE><body><p>test</p></body>";
    test("return invalid_extra_closing_tag type and extra opening tag name", () => {
      expect(htmlTagCheck(html)).toStrictEqual<Return>({
        type: "invalid_extra_opening_tag",
        detail: [
          {
            type: "opening",
            tag: "<p>",
            index: 0,
          },
        ],
      });
    });
  });

  describe("If a normal self-closing tag is present", () => {
    const html =
      "<!DOCTYPE><body><p>test</p><img src='image.jpg' alt='An image'/></body>";
    test("return valid type", () => {
      expect(htmlTagCheck(html)).toStrictEqual<Return>({
        type: "valid",
      });
    });
  });

  describe("If a tag exists that does not require a closing tag", () => {
    const html = "<!DOCTYPE><body><p>test</p><br></body>";
    test("return valid type", () => {
      expect(htmlTagCheck(html)).toStrictEqual<Return>({
        type: "valid",
      });
    });
  });
});
