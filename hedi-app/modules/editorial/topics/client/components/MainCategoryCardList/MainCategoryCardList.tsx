import React from "react";
import { ICategory } from "@/modules/editorial/category/types";
import { MainCategoryCard } from "./MainCategoryCard";
import { IMainCategoryCardList } from "@/modules/editorial/topics/types";

export const MainCategoryCardList = (props: IMainCategoryCardList) => {
  const { categories } = props;

  return (
    <div className="hedi--main-category__list">
      {categories.map((category, index) => {
        return (
          <MainCategoryCard
            key={category.label + index}
            index={index}
            category={category as ICategory}
          />
        );
      })}
    </div>
  );
};
