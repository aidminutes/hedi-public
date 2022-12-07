// https://github.com/nodejs/node/issues/3462#issuecomment-149802788
export function btoa(str: string) {
  if (Buffer.byteLength(str) !== str.length) throw new Error("bad string!");
  return Buffer.from(str, "binary").toString("base64");
}
