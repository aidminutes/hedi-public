import path from "path";

export const getScaled = (
  realWidth: number,
  realHeight: number,
  maxWidth: number,
  maxHeight: number
) => {
  let scaledWidth = realWidth,
    scaledHeight = realHeight;
  if (scaledWidth > maxWidth) {
    let ratio = scaledHeight / scaledWidth;
    scaledWidth = maxWidth;
    scaledHeight = scaledWidth * ratio;
  }
  if (scaledHeight > maxHeight) {
    let ratio = scaledWidth / scaledHeight;
    scaledHeight = maxHeight;
    scaledWidth = scaledHeight * ratio;
  }
  return { scaledWidth, scaledHeight };
};

export const getImageMimeType = (filename: string) => {
  return ("image/" + path.extname(filename).substr(1)).replace("/jpg", "/jpeg"); // TODO make complete if necessary
};
