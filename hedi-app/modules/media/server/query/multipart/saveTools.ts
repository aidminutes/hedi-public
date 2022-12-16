import fs from "fs";
import pathUtils from "path";

interface ISaveToDiskResult {
  succeed: boolean;
  error?: string;
  savedAsFilename?: string;
}

export const saveBufferToDisk = (
  content: Uint8Array,
  path: string,
  filename: string,
  saveAsOthernameIfExists: boolean = true
): ISaveToDiskResult => {
  filename = getSafeFilename(filename);
  const fullpath = getRelativePath(path, filename);
  try {
    if (fs.existsSync(fullpath) && !saveAsOthernameIfExists)
      return {
        succeed: false,
        error: "file already exists",
      };
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
    const savedAsFilename = getUniqueFilename(path, filename);
    fs.writeFileSync(
      getRelativePath(path, savedAsFilename),
      Buffer.from(content)
    );
    return { succeed: true, savedAsFilename };
  } catch (e) {
    const error = e as Error;
    return {
      succeed: false,
      error: error.message ?? error.name ?? JSON.stringify(error),
    };
  }
};

const getUniqueFilename = (path: string, filename: string) => {
  if (fs.existsSync(pathUtils.join(path, filename))) {
    const extension = pathUtils.extname(filename);
    const rawFilename = filename.substring(
      0,
      filename.length - extension.length
    );
    let counter = 0;
    while (
      fs.existsSync(
        pathUtils.join(path, rawFilename + "_" + counter + extension)
      )
    )
      counter++;
    filename = rawFilename + "_" + counter + extension;
  }
  return filename;
};

export const getSafeFilename = (filename: string) =>
  filename
    .replace(/\/|\\|\||>|<|"|\*/g, "")
    .replace(/\.\./g, "")
    .replace(/\s/g, "-");

export const getRelativePath = (...pathParts: string[]) => {
  if (!pathParts) throw new Error("path should not be null");
  const path = pathUtils.join(...pathParts);
  if (path.startsWith("/")) return path;
  return path.startsWith("./") ? path : "./" + path;
};
