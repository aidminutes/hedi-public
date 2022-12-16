import Link from "next/link";
import { HeaderName, Button } from "carbon-components-react";
import { Logo } from "@/modules/svg";
import { IBackToHome } from "./types";

export const BackToHome = ({ labelText, href }: Partial<IBackToHome>) => {
  return (
    <Link href={href ?? "/"}>
      {
        <HeaderName prefix="" href={href}>
          <Button
            renderIcon={Logo}
            hasIconOnly
            iconDescription={labelText ?? ""}
            className="hedi--back-to-home"
          />
        </HeaderName>
      }
    </Link>
  );
};
