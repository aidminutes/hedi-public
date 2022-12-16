import { INoResultHintBox } from "@/modules/common/client/components";
import { IBreadCrumb } from "@/modules/shell/client/components/BreadCrumb/types";
import { useRouter } from "next/router";
import { ISearchResultProps } from "./useSearchResults";
import { getSearchResultDefinitions } from "./getSearchResultDefinitions";

export function transformSearchComponents(props: ISearchResultProps) {
  const { components, isLoading, loadingHelpText } = props;
  const { defaultLocale, locale } = useRouter();
  const {
    resultsHeadline,
    glossaryLink,
    noResultHint,
    noResultIcon,
    noResultNotification,
    noResultHintHeadline,
    resultsBody,
    allArticle,
    resultsFor,
    resultsText,
    resultText,
  } = getSearchResultDefinitions(components);

  const noResultData: INoResultHintBox = {
    notification: noResultNotification,
    hint: noResultHint,
    icon: noResultIcon,
    headline: noResultHintHeadline,
  };

  const breadcrumb: IBreadCrumb = {
    breadcrumbType: "standard",
    lang: "de",
    routelabel: glossaryLink?.labelText || "Glossar",
    route: glossaryLink?.href || "/glossary",
    label: glossaryLink?.labelText || "Glossar",
    type: "GlossaryTerm",
  };
  return {
    resultsHeadline,
    defaultLocale,
    breadcrumb,
    noResultData,
    isLoading,
    loadingHelpText,
    resultsBody,
    allArticle,
    resultsFor,
    resultsText,
    resultText,
  };
}
