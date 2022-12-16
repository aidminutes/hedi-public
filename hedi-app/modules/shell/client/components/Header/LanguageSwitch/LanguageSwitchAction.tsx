import { HeaderGlobalAction } from "carbon-components-react";
import { Earth24 } from "@carbon/icons-react";
import { useLocaleInfo } from "../../../contexts";
import { ILanguageSwitchAction } from "./types";

export const LanguageSwitchAction = (props: ILanguageSwitchAction) => {
  const {
    active: { isRTL },
  } = useLocaleInfo();
  const tooltipAlignment = isRTL ? "start" : "end";
  const { renderIcon, iconDescription, labelText, ...rest } = props;
  const title = iconDescription || labelText;

  return (
    <HeaderGlobalAction
      title={title}
      {...rest}
      tooltipAlignment={tooltipAlignment}>
      <Earth24 />
    </HeaderGlobalAction>
  );
};
