import { IImage } from "@/modules/media/types";
import { IBreadCrumb } from "@/modules/shell/client/components/BreadCrumb/types";
import { IEntityTranslated } from "@/modules/model";
import { IWithAppStyle, IWithRouteLabel } from "@/modules/editorial/types";
import { useRouter } from "next/router";
import { PartialBy } from "../../../utils";
export type EntryType = "full" | "normal" | "normal-neighbours" | "minimal";
// entryTypes:
// full: (image), breadcrumb, headline, summary, one element per column
// normal: full + less columns then full
// neighbours: breadcrumb, headline, summary, two elements per column
// minimal: IWithAppStyle, headline,
export interface IEntryProps
  extends PartialBy<IEntityTranslated, "translations">,
    Partial<IWithRouteLabel>,
    Partial<IWithAppStyle> {
  externalBreadCrumb?: IBreadCrumb;
  image?: IImage;
  summary?: string;
  entryType: EntryType;
  body?: string;
}

export function transformEntry(props: IEntryProps) {
  const {
    route,
    image,
    summary,
    label,
    entryType,
    externalBreadCrumb,
    lang,
    routelabel,
    type,
    appStyle,
    body,
    translations,
  } = props;
  const router = useRouter();
  const { defaultLocale } = router;

  const defaultLang = defaultLocale || "de";

  let breadcrumbData: IBreadCrumb;

  if (externalBreadCrumb !== undefined) {
    breadcrumbData = externalBreadCrumb;
  } else {
    breadcrumbData = {
      label,
      lang,
      route,
      type,
      appStyle,
      breadcrumbType:
        entryType === "normal-neighbours" || routelabel === undefined
          ? "graphical"
          : "withoutTitle",
      routelabel: routelabel || "",
    };
  }

  let glossaryTranslation: string | null = null;
  if (type === "GlossaryTerm" && translations) {
    glossaryTranslation =
      translations.find(term => term.lang === defaultLang)?.label || null;
  }
  const gridClass = image !== undefined ? "hedi--entry__grid" : undefined;

  const entryClass = `hedi--entry ${
    type ? ` hedi--entry__${type.toLowerCase()}` : ""
  }${entryType === "full" ? " hedi--entry--full" : ""}`;

  const textwrapClass = `hedi--entry__grid--content__text-wrap${
    entryType === "full" ? " hedi--entry__grid--content__text-wrap--full" : ""
  }`;

  return {
    gridClass,
    image,
    breadcrumbData,
    summary: summary || body,
    label,
    route,
    background: image?.color || "transparent",
    entryClass,
    textwrapClass,
    entryType,
    glossaryTranslation,
  };
}
