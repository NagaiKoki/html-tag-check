export const trimText = (text: string): string =>
  text.replace(/>\s+</g, "><").replace(/\n|\r/g, "").trim();
