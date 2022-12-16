import Link from "next/link";

import { GlossaryTerm } from "..";
import { IGlossaryTerm } from "../../../types";

import { ClickableTile } from "carbon-components-react";
import {
  transformGlossaryTermClickable,
  IGlossaryTermClickableProps,
} from "./transformGlossaryTermClickable";
import { BreadCrumb } from "@/modules/shell/client/components";
export const GlossaryTermClickable = (
  props: IGlossaryTermClickableProps
): JSX.Element => {
  const {
    lang,
    route,
    glossaryTerm,
    breadcrumbData,
    notificationText,
  } = transformGlossaryTermClickable(props);

  return (
    <>
      <div className="hedi--article-entry">
        <Link href={route} passHref>
          <ClickableTile href={route} light={true}>
            <BreadCrumb {...breadcrumbData} />
            <GlossaryTerm
              lang={lang}
              glossaryTerm={glossaryTerm as IGlossaryTerm}
              // TODO
              notificationText={notificationText}
            />
          </ClickableTile>
        </Link>
      </div>
    </>
  );
};
