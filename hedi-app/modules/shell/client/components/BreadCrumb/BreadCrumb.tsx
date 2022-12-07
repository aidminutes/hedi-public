import { IBreadCrumb } from "./types";
import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";
import { ArrowLeft16 } from "@carbon/icons-react";
import Link from "next/link";
import { transformBreadCrumb } from "./transformBreadCrumb";

export const BreadCrumb: React.FunctionComponent<IBreadCrumb> = (
  props: IBreadCrumb
): JSX.Element => {
  const {
    breadCrumbPath,
    breadcrumbType,
    breadcrumbClass,
    appStyle,
    backLink,
    backLinkBreadrcumbClass,
    pathLimit,
    notLinked,
  } = transformBreadCrumb(props);
  if (breadcrumbType === "graphical") {
    return (
      <div className={`hedi--breadcrumb__graphical hedi--print__hide`}>
        <div className={`${appStyle || "default"}--stroke`} />
      </div>
    );
  }

  return (
    <Breadcrumb
      aria-label="breadcrumb"
      noTrailingSlash
      className={breadcrumbClass}>
      {backLink !== null ? (
        <>
          <ArrowLeft16 />
          <Link href={backLink?.href} passHref>
            <BreadcrumbItem
              className={backLinkBreadrcumbClass}
              href={backLink?.href}>
              {backLink?.labelText}
            </BreadcrumbItem>
          </Link>
        </>
      ) : null}

      {breadCrumbPath.map((crumb, index) => {
        if (breadcrumbType === "withoutTitle") {
          if (
            index + 1 !== breadCrumbPath.length &&
            (!pathLimit || index < pathLimit)
          )
            if (notLinked) {
              return (
                <span
                  key={crumb.route}
                  className={
                    index + 1 !== breadCrumbPath.length
                      ? "bx--breadcrumb-item hedi--breadcrumb__main-category"
                      : "bx--breadcrumb-item "
                  }>
                  {crumb.label}
                </span>
              );
            } else {
              return (
                <Link href={crumb.route} passHref key={crumb.route}>
                  <BreadcrumbItem
                    className={
                      index + 1 !== breadCrumbPath.length
                        ? "hedi--breadcrumb__main-category"
                        : ""
                    }
                    isCurrentPage={crumb.isCurrentPage}
                    href={crumb.route}>
                    {crumb.label}
                  </BreadcrumbItem>
                </Link>
              );
            }
        } else {
          return (
            <Link key={crumb.route} href={crumb.route} passHref>
              <BreadcrumbItem
                className={
                  index + 1 !== breadCrumbPath.length
                    ? "hedi--breadcrumb__main-category"
                    : ""
                }
                key={crumb.label + index}
                isCurrentPage={crumb.isCurrentPage}
                href={crumb.route}>
                {crumb.label}
              </BreadcrumbItem>
            </Link>
          );
        }
      })}
    </Breadcrumb>
  );
};
