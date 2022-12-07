import { constructBreadCrumbPathData } from "./constructBreadCrumbData";
import { IBreadCrumb } from "./types";

export function transformBreadCrumb(props: IBreadCrumb) {
  const {
    lang,
    breadcrumbType,
    appStyle,
    backLink,
    pathLimit,
    notLinked,
  } = props;

  const breadCrumbPath = constructBreadCrumbPathData(props);
  // TODO only works for SSG
  const isCurrentPage = breadCrumbPath.length === 0;

  const className = "hedi--breadcrumb  hedi--print__hide";
  const backLinkClassName = `hedi--breadcrumb__back-link`;
  const backLinkBreadrcumbClass = appStyle
    ? `hedi--breadcrumb__main-category ${backLinkClassName}`
    : backLinkClassName;

  const breadcrumbClass = appStyle
    ? `${className} ${appStyle}--article-entry__breadcrumb`
    : className;

  const breadcrumbItemClass = isCurrentPage
    ? ""
    : "hedi--breadcrumb__main-category";

  return {
    breadCrumbPath,
    isCurrentPage,
    lang,
    breadcrumbType: breadcrumbType !== undefined ? breadcrumbType : "standard",
    breadcrumbClass,
    appStyle,
    backLink: backLink || null,
    backLinkBreadrcumbClass,
    breadcrumbItemClass,
    pathLimit,
    notLinked: !!notLinked,
  };
}
