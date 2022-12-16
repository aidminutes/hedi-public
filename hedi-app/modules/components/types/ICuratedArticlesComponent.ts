import { IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type CuratedArticlesKind = "CuratedArticles";

export interface ICuratedArticlesComponent extends IComponent {
  kind: CuratedArticlesKind;
  labelKind: string;
  text?: string;
  articleRoutes?: string[];
}

export const isCuratedArticles = (
  obj: IComponent
): obj is ICuratedArticlesComponent => obj?.kind === "CuratedArticles";

export const isCuratedArticlesInstance = (
  obj: IComponent,
  id: string
): obj is ICuratedArticlesComponent => isCuratedArticles(obj) && obj.id === id;

export const findCuratedArticlesInstance = (array: IComponent[], id: string) =>
  findComponentInstance<ICuratedArticlesComponent>(
    "CuratedArticles",
    array,
    id
  );

export const getCuratedArticlesInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ICuratedArticlesComponent, "kind" | "id">
) => getComponentInstance("CuratedArticles", array, id, fallback);
