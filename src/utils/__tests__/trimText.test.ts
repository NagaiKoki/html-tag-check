import { trimText } from "../trimText";

describe("trimText", () => {
  describe("If html string has new lines and white spaces", () => {
    const html = `
      <div class='sample'>
        <p>test</p>
      </div>
    `;

    test("return trimmed text", () => {
      expect(trimText(html)).toEqual<string>(
        "<div class='sample'><p>test</p></div>"
      );
    });
  });

  describe("If html string has no lines and white spaces", () => {
    const html = `<div class='sample'><p>test</p></div>`;

    test("Returns the string given as an argument as is", () => {
      expect(trimText(html)).toEqual<string>(
        "<div class='sample'><p>test</p></div>"
      );
    });
  });
});
