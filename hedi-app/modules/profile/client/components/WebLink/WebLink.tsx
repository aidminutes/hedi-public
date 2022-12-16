import Link from "next/link";
import { LinkProps } from "carbon-components-react";
import { Launch16 } from "@carbon/icons-react";
import { prettifyUrl } from "@/modules/common/utils";
import { IWebsite } from "../../../types/dataTypes";

export const WebLink = (props: Partial<IWebsite> & Omit<LinkProps, "href">) => {
  const { dataKind, website, dataVisibility, ...rest } = props;
  // TODO dataKind
  const prettyUrl = website ? prettifyUrl(website) : null;
  const httpsWebsite = website?.includes('https') ? website : 'https://'+website
  return website ? (
    <>
      <Link href={httpsWebsite} passHref>
        <a
          target="_blank"
          className="hedi--link__weblink bx--link--lg"
          {...rest}>
          {prettyUrl}
        </a>
      </Link>
      <Launch16 className="hedi--print__hide" />
    </>
  ) : (
    <></>
  );
};
