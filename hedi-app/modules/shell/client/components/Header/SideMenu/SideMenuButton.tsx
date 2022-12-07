import React from "react";
import { HeaderMenuButton } from "carbon-components-react";
import { ISideMenuButton } from "./types";

export const SideMenuButton = React.forwardRef(
  (props: ISideMenuButton, ref) => (
    <HeaderMenuButton aria-label={"HEDI"} {...props} />
  )
);
