import React from "react";
import Link from "next/link";
import {
  Button as CarbonDefaultButton,
  ButtonDefaultProps,
} from "carbon-components-react";
import { transformButton, IButtonProps } from "./transformButton";

// NOTE see typings for reason
const CarbonButton = CarbonDefaultButton as React.FC<ButtonDefaultProps>;

export const Button = (props: IButtonProps) => {
  const { child, href, ...rest } = transformButton(props);
  if (href)
    return (
      <Link href={href} passHref>
        <CarbonButton {...rest}>{child}</CarbonButton>
      </Link>
    );
  else return <CarbonButton {...rest}>{child}</CarbonButton>;
};
