import React from "react";
import { AspectRatio, ClickableTile } from "carbon-components-react";
import cx from "classnames";
import { Body, Image, Link } from "@/modules/components";
import { BreadCrumb } from "@/modules/shell/client/components";
import { IBreadCrumb } from "@/modules/shell/client/components/BreadCrumb/types";
import { ICuratedArticleProps } from "../../../../types/ICuratedArticleEntry";

export const CuratedArticle: React.FC<ICuratedArticleProps> = ({ article }) => {
  const breadcrumbData = {
    label: article.label,
    lang: article.lang,
    route: article.route,
    type: article.type,
    appStyle: article.appStyle,
    breadcrumbType: "withoutTitle",
    routelabel: article.routelabel || "",
  } as IBreadCrumb;
  return (
    <ClickableTile href={article.route} className="hedi--curated-article__tile">
      <div className={cx("hedi--curated-article", article.appStyle)}>
        <AspectRatio
          ratio="1x1"
          className="hedi--curated-article__img-container"
          style={{
            backgroundColor: article?.category.image?.color || "transparent",
          }}>
          {article.category.image && (
            <div>
              <Image
                {...article.category.image}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                sizes="38vw"
              />
            </div>
          )}
        </AspectRatio>
        <div className="hedi--curated-article__text-container">
          <div className="hedi--curated-article__text">
            <div className="hedi--curated-article__breadcrumb">
              <BreadCrumb {...breadcrumbData} pathLimit={1} notLinked={true} />
            </div>
            <h4 className="hedi--curated-article__title">
              <Link href={article.route} labelText={article.label} />
            </h4>
            <div className="hedi--curated-article__summary">
              <Body body={article.summary} />
            </div>
          </div>
        </div>
      </div>
    </ClickableTile>
  );
};
