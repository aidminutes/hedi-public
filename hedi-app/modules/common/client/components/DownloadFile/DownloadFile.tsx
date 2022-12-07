import { IFileComponent, ILabelComponent } from "@/modules/components";
import React from "react";

export interface IDownloadFileProps {
  file: IFileComponent;
  label: ILabelComponent;
}

export const DownloadFile = (props: IDownloadFileProps) => {
  const { file, label } = props;
  return (
    <a href={process.env.NEXT_PUBLIC_ASSETS_URL + file.route} target="_blank">
      {label.text}
    </a>
  );
};
