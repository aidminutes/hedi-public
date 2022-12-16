import React from "react";
import Link from "next/link";
import { Image, Body } from "@/modules/components";
import { AspectRatio, Link as CarbonLink } from "carbon-components-react";
import { BreadCrumb } from "@/modules/shell/client/components";
import { HTML } from "@/modules/react/html";
import { IEntryProps, transformEntry } from "./transformEntry";

export const Entry = (props: IEntryProps) => {
  const {
    route,
    image,
    background,
    breadcrumbData,
    summary,
    label,
    textwrapClass,
    entryClass,
    entryType,
    glossaryTranslation,
  } = transformEntry(props);

  const gridClass = image !== undefined ? "hedi--entry__grid" : undefined;

  return (
    <div className={entryClass}>
      <Link href={route} passHref>
        <CarbonLink className="bx--tile bx--tile--clickable bx--tile--light">
          <div className={gridClass}>
            {image && (
              <AspectRatio
                ratio="1x1"
                className="hedi--entry__grid--image"
                style={{ backgroundColor: background }}>
                <Image
                  objectFit="contain"
                  objectPosition="top"
                  layout="fill"
                  {...image}
                />
              </AspectRatio>
            )}
            <div className="hedi--entry__grid--content">
              {breadcrumbData && (
                <BreadCrumb notLinked={true} {...breadcrumbData} />
              )}
              <h3>
                <HTML data={label} />
              </h3>
              {glossaryTranslation && (
                <div className="hedi--glossary-term--full">
                  <p className="hedi--glossary-term__marked-translation">
                    <span>German Term: </span>
                    {glossaryTranslation}
                  </p>
                </div>
              )}
              {summary && entryType !== "minimal" && (
                <div className={textwrapClass}>
                  <p>
                    <Body body={summary} />
                  </p>
                </div>
              )}
            </div>
          </div>
        </CarbonLink>
      </Link>
    </div>
  );
};
