import React from "react";
import { Bullhorn20 } from "@carbon/icons-react";
import { IFileComponent, ILabelComponent, Label } from "@/modules/components";
import { DownloadFile } from "@/modules/common/client/components";

export interface INewsBarProps {
  text: ILabelComponent;
  linkText?: ILabelComponent;
  file?: IFileComponent;
}

export const NewsBar = (props: INewsBarProps) => {
  const { text, linkText, file } = props;
  return (
    <div className="hedi--news-bar">
      <span className="hedi--news-bar__title">
        NEWS <Bullhorn20 />
      </span>

      <span className="hedi--news-bar__text">
        <Label {...text} />
      </span>
      <span className="hedi--news-bar__seperator">+ + +</span>
      {linkText && file && (
        <span className="hedi--news-bar__link">
          <DownloadFile file={file} label={linkText} />
        </span>
      )}
    </div>
  );
};
