import React from "react";
import { transformMainCategoryCard } from "./transformMainCategoryCard";
import { Column, Row } from "carbon-components-react";
import { Image } from "@/modules/components";
import Link from "next/link";
import { IMainCategoryCard } from "@/modules/editorial/topics/types";

export const MainCategoryCard = ({ category, index }: IMainCategoryCard) => {
  const { label, image, appStyle, route } = category;
  const {
    rowIsEven,
    firstColumnProps,
    secondColumnProps,
  } = transformMainCategoryCard(index);
  return (
    <Link href={route}>
      <a>
        <div className={`hedi--main-category__card`}>
          <Row condensed>
            <Column
              {...firstColumnProps}
              className={
                rowIsEven ? "" : "hedi--main-category__card--image-wrap"
              }>
              {rowIsEven ? (
                <div
                  className={`hedi--main-category__card--text ${appStyle}--main-category__card`}>
                  <p>{label}</p>
                </div>
              ) : (
                image && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center center"
                    {...image}
                    sizes="(max-width: 671px) 25vw, 38vw"
                    priority
                  />
                )
              )}
            </Column>
            <Column
              {...secondColumnProps}
              className={
                rowIsEven ? "hedi--main-category__card--image-wrap" : ""
              }>
              {rowIsEven ? (
                image && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center center"
                    {...image}
                    sizes="(max-width: 671px) 25vw, 38vw"
                    priority
                  />
                )
              ) : (
                <div
                  className={`hedi--main-category__card--text ${appStyle}--main-category__card`}>
                  <p>{label}</p>
                </div>
              )}
            </Column>
          </Row>
        </div>
      </a>
    </Link>
  );
};
