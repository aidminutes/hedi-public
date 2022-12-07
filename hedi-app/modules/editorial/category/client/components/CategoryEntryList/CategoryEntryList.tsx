import React from "react";
import { Row, Column } from "carbon-components-react";
import { ICategory, ICategoryEntry } from "../../../types";
import { CategoryEntry } from "../CategoryEntry/CategoryEntry";

export interface ICategoryEntryList {
  categories: ICategoryEntry[];
}

export const CategoryEntryList = (props: ICategoryEntryList) => {
  const { categories } = props;
  return (
    <div className="hedi--category-entry-list">
      <Row>
        {categories.map(category => (
          <Column {...{ sm: 4, md: 2, lg: 3 }} key={category.route}>
            <CategoryEntry category={category} />
          </Column>
        ))}
      </Row>
    </div>
  );
};
