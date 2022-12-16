import React from "react";
import {
  IButtonProps,
  ILinkProps,
  Button,
  Link,
  Label,
} from "@/modules/components";
import { ILabelComponent } from "@/modules/components/types";
export interface IButtonHintLinkProps {
  button: IButtonProps;
  link: ILinkProps;
  hint: ILabelComponent;
}

export const ButtonHintLink = (props: IButtonHintLinkProps) => {
  const { button, link, hint } = props;
  return (
    <div className="hedi--button-hint-text">
      {button && <Button {...button} />}
      <div>
        {hint && <Label {...hint} />} {link && <Link {...link} />}
      </div>
    </div>
  );
};
