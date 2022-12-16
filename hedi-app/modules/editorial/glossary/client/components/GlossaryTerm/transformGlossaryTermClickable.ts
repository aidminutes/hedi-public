import { IBreadCrumb } from "@/modules/shell/client/components/BreadCrumb/types";
import { IGlossaryTermProps } from "./transformGlossaryTerm";

export interface IGlossaryTermClickableProps extends IGlossaryTermProps {
  breadcrumbData: IBreadCrumb;
}

export function transformGlossaryTermClickable(
  props: IGlossaryTermClickableProps
) {
  const { glossaryTerm, lang, breadcrumbData, notificationText } = props;
  const { route } = glossaryTerm;

  const glossaryTermId = route.split("/").pop();
  const glossaryTermWithSlash = "/" + glossaryTermId;

  const routeWithAnchor = route.replace(
    glossaryTermWithSlash,
    "#" + glossaryTermId
  );
  return {
    glossaryTermId,
    lang,
    route: routeWithAnchor,
    glossaryTerm,
    breadcrumbData,
    notificationText,
  };
}
