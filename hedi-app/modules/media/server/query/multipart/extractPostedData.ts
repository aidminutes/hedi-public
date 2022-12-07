import { IncomingMessage } from "http";
import { NextApiRequest } from "next";
import { getEncodingName, getCharset } from "./helpers";

export interface IUploadedFileInfo {
  content: Uint8Array;
  fieldname: string;
  originalname: string;
}

export interface ISavedFileInfo extends Omit<IUploadedFileInfo, "content"> {
  savedAsFilename?: string;
  error?: string;
}

interface IPartHeader {
  name: string;
  filename: string;
}

type ExtractedContent = { [key: string]: any } & {
  files?: IUploadedFileInfo[];
};

export const extractPostedData = async (
  req: IncomingMessage,
  setExtractedContentToRequestBody: boolean = false
): Promise<ExtractedContent> => {
  return new Promise<ExtractedContent>((resolve, reject) => {
    const buffer: any[] = [];
    const contentType = req.headers["content-type"] ?? "";

    req.on("data", chunk => buffer.push(chunk));
    req.on("end", () => {
      const buf = Buffer.concat(buffer);
      let extractedContent = {} as ExtractedContent;
      if (contentType.indexOf("multipart/form-data") != -1) {
        extractedContent = extractMultipart(buf, contentType);
      } else if (contentType.indexOf("www-x-form-urlencoded") != -1) {
        const encoding = getEncodingName(getCharset(contentType));
        extractedContent = extractWwwForm(buf.toString(encoding));
      }
      if (setExtractedContentToRequestBody)
        (req as NextApiRequest).body = extractedContent;
      resolve(extractedContent);
    });
    req.on("error", err => reject(err));
  });
};

const extractMultipart = (
  buffer: Buffer,
  contentType: string
): ExtractedContent => {
  const result: ExtractedContent = {};
  const encoding = getEncodingName(getCharset(contentType));
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);

  if (!boundaryMatch) {
    throw new Error("Bad content-type header, no multipart boundary");
  }

  const boundary = "--" + (boundaryMatch[1] || boundaryMatch[2]); // [1]: boundary is within `""`, [2]: without `""`
  const parts = splitMultipartBuffer(buffer, boundary, encoding);

  for (const part of parts) {
    if (part.header.filename) {
      if (!result.files) result.files = [];
      result.files.push({
        fieldname: part.header.name,
        originalname: part.header.filename,
        content: part.content,
      });
    } else
      result[part.header.name] = decodeURIComponent(
        Buffer.from(part.content).toString(encoding)
      );
  }

  return result;
};

const splitMultipartBuffer = (
  buffer: Buffer,
  boundary: string,
  encoding: BufferEncoding
) => {
  const parts: { header: IPartHeader; content: Uint8Array }[] = [];
  let indexOfBoundary = buffer.indexOf(boundary, 0);
  const headerSplitter = "\r\n\r\n"; // in HTTP header and body are separeted using \r\n\r\n
  const newlineLength = 2; // in HTTP newline is always \r\n
  while (indexOfBoundary != -1) {
    let nextBoundaryPos = buffer.indexOf(
      boundary,
      indexOfBoundary + boundary.length
    );
    if (nextBoundaryPos == -1) break;
    const partBodyBeginIndex =
      buffer.indexOf(headerSplitter, indexOfBoundary) + headerSplitter.length;
    if (partBodyBeginIndex > nextBoundaryPos) break;
    const partHeaderBuffer = Buffer.alloc(partBodyBeginIndex - indexOfBoundary);
    buffer.copy(partHeaderBuffer, 0, indexOfBoundary, partBodyBeginIndex);
    // header-bytes are always string
    const partHeader = extractDisposition(
      partHeaderBuffer.toString(encoding).replace(boundary, "")
    );
    const partBodyBuffer = Buffer.alloc(
      nextBoundaryPos - partBodyBeginIndex - newlineLength
    );
    buffer.copy(
      partBodyBuffer,
      0,
      partBodyBeginIndex,
      nextBoundaryPos - newlineLength
    );

    parts.push({
      header: partHeader,
      content: partBodyBuffer,
    });

    indexOfBoundary = nextBoundaryPos;
  }
  return parts;
};

const extractDisposition = (header: string): IPartHeader => {
  const headerFields = {} as IPartHeader;
  const partHeaders = header.split("\r\n");
  for (const header of partHeaders) {
    let matchResult = header.match(/[;| ]name="([^"]*)"/);
    if (matchResult) headerFields.name = matchResult[1];
    matchResult = header.match(/^.*filename="([^"]*)"$/);
    if (matchResult) headerFields.filename = matchResult[1];
  }
  return headerFields;
};

const extractWwwForm = (body: string): ExtractedContent => {
  const result: ExtractedContent = {};
  const keyValues = body.split("&");
  for (const kv of keyValues) {
    const [key, value] = kv.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(value);
  }
  return result;
};
