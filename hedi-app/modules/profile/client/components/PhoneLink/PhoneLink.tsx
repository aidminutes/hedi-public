import { Link } from "carbon-components-react";
import { formatPhoneNumber } from "@/modules/common/utils";
import { IPhone } from "../../../types/dataTypes";
import { LinkProps } from "carbon-components-react/lib/components/UIShell/Link";

export const PhoneLink = (props: Partial<IPhone> & LinkProps) => {
  const { dataKind, phone, phoneKind, dataVisibility, ...rest } = props;
  // TODO dataKind
  const phoneLink = phone ? formatPhoneNumber(phone) : null;
  return (
    <Link
      href={`tel:${phoneLink}`}
      target="_blank"
      className="bx--link--lg"
      {...rest}>
      {phone}
    </Link>
  );
};
