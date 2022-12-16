import { IEntityLocalized } from "@/modules/model/IEntityLocalized";

export type RouteInfo = Pick<IEntityLocalized, "lang" | "route">;

export type IRouteTransformSet = Record<Locale, IRouteTransformRule[]>;

type Locale = string;

export interface IRouteTransformRule {
  target: string;
  startsWith?: string;
  matches?: string;
}
