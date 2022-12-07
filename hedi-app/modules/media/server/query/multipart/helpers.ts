import { MediaInputType } from "../../../types";
import pathUtils from "path";

export const getEncodingName = (charset: string): BufferEncoding => {
  charset = (charset ?? "").toLowerCase();
  const validEncodings = [
    "ascii",
    "base64",
    "binary",
    "hex",
    "latin1",
    "ucs-2",
    "ucs2",
    "utf-8",
    "utf16le",
    "utf8",
  ];
  let encoding = "utf-8";
  if (validEncodings.includes(charset)) encoding = charset;
  return encoding as BufferEncoding;
};

export const getMediaType = (filename: string): MediaInputType => {
  const mediatypeExtensions = [
    { mediatype: "file", extensions: ["pdf", "doc", "docx", "xls", "xlsx"] },
    { mediatype: "audio", extensions: ["mp3", "ogg", "aac", "wav"] },
    {
      mediatype: "video",
      extensions: ["mov", "wmv", "webm", "mkv", "avi", "flv", "mp4"],
    },
    { mediatype: "image", extensions: ["png", "jpg", "jpeg", "webp", "gif"] },
    { mediatype: "svg", extensions: ["svg"] },
  ];
  const extension = pathUtils.extname(filename).substr(1); // TODO what if the file has no extension
  const mediatype = mediatypeExtensions.find(group =>
    group.extensions.includes(extension)
  )?.mediatype as MediaInputType;
  return mediatype ?? "file";
};

export const getCharset = (contentType: string) => {
  const defaultCharset = "utf-8";
  const charsetMatch = contentType.match(/[;| ]charset\s*=(.*)/);
  return charsetMatch ? charsetMatch[1] : defaultCharset;
};
