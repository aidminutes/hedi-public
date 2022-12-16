import React, { useState } from "react";
import { Column, Row } from "carbon-components-react";
import { SearchInput } from "@/modules/search/client/components";
import { Button, Image } from "@/modules/components";
import { ArrowRight16, Search16 } from "@carbon/icons-react";
import { ArticleSearchSectionProps } from "@/modules/editorial/topics/types";

export const ArticleSearchSection: React.FC<ArticleSearchSectionProps> = ({
  button,
  image,
  placeholderText,
  headline,
}) => {
  const [query, setQuery] = useState("");
  return (
    <Row>
      <Column lg={3} md={1} sm={0} />
      <Column lg={10} md={6} sm={4} className="hedi--article-search-section">
        {headline && (
          <h3 className="hedi--article-search-section__headline">{headline}</h3>
        )}
        <div className="hedi--article-search-section__search">
          <SearchInput
            light={true}
            onQueryChanged={text => setQuery(encodeURIComponent(text))}
            placeHolderText={placeholderText}
            onKeyDown={e => {
              if (e.key === "Enter") {
                location.assign(`${button.href}/${query}`);
              }
            }}
          />
          <Button
            {...button}
            href={`${button.href}/${query}`}
            renderIcon={ArrowRight16}
            className="hedi--article-search-section__search__button hedi--rtl-icon"
          />
          <Button
            {...button}
            href={`${button.href}/${query}`}
            renderIcon={Search16}
            text=""
            hasIconOnly
            className="hedi--article-search-section__search__button--mobile"
          />
        </div>
        {image && (
          <div className="hedi--article-search-section__image">
            <Image {...image} />
          </div>
        )}
      </Column>
      <Column lg={3} md={1} sm={0} />
    </Row>
  );
};
