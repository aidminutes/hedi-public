import { Link } from "carbon-components-react";
import { IEmail } from "../../../types/dataTypes";
import { LinkProps } from "carbon-components-react/lib/components/UIShell/Link";

export const EmailLink = (props: Partial<IEmail> & LinkProps) => {
  const { dataKind, email, dataVisibility, ...rest } = props;
  // TODO phoneKind
  return (
    <Link
      href={`mailto:${email}`}
      target="_blank"
      className="bx--link--lg"
      inline
      {...rest}>
      {email}
    </Link>
  );
};
