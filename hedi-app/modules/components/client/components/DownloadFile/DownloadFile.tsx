import React from "react";
import {
  transformDownloadFile,
  IDownloadFileProps,
} from "./transformDownloadFile";

export const DownloadFile = (props: IDownloadFileProps) => {
  const { href, text, mimeType } = transformDownloadFile(props);

  return (
    <a href={href} download target="_blank">
      {text}
    </a>
  );
};
