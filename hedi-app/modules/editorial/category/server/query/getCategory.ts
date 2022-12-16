import { logAndNull } from "@/modules/common/error";
import { getLangByRoute } from "@/modules/common/utils";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQICategory } from "../gqTypes/GQICategory";
import { ICategory } from "../../types";

type CategoriesResponse = {
  categories: ICategory[];
};

const categoriesResponseGQ: CategoriesResponse = {
  categories: [GQICategory],
};

const getCategoryQuery = gql`
  query getCategories(
    $routes: [String!]!
    $lang: String!
  ) { 
    ${withArgs(categoriesResponseGQ, "categories", {
      routes: "$routes",
      lang: "$lang",
    })}
  }
`;

export async function getCategory(route: string): Promise<ICategory | null> {
  const lang = getLangByRoute(route);

  return serviceGQuery<CategoriesResponse>(getCategoryQuery, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.categories[0] ?? null);
}
