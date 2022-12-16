import { HeaderGlobalAction } from "carbon-components-react";
import { User24, UserAdmin24 } from "@carbon/icons-react";
import { useUser } from "@/modules/auth/client/hooks";
import { useLocaleInfo } from "../../../contexts";
import { IAccountMenuAction } from "./types";

export const AccountMenuAction = (props: IAccountMenuAction) => {
  const {
    active: { isRTL },
  } = useLocaleInfo();
  const tooltipAlignment = isRTL ? "start" : "end";
  const [user] = useUser();
  const { renderIcon, iconDescription, labelText, href, ...rest } = props;
  const title = iconDescription || labelText;

  return (
    <HeaderGlobalAction
      aria-label={title}
      isActive
      title={title}
      {...rest}
      tooltipAlignment={tooltipAlignment}>
      {user?.name ? <UserAdmin24 /> : <User24 />}
    </HeaderGlobalAction>
  );
};
