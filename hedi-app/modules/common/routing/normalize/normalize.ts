import { IRouteTransformSet } from "../types";
import { segmentsToRoute } from "../utils";

type getTransformSetFunc = () => IRouteTransformSet;

export function normalizeSegments(
  segments: string[] | undefined,
  locale: string = "de",
  fns: getTransformSetFunc[] = []
) {
  const route = segmentsToRoute(segments ?? [], locale);
  return applyTransform(route, locale, fns);
}

export function normalizeRoute(
  route: string | undefined,
  locale: string = "de",
  fns: getTransformSetFunc[] = []
) {
  // TODO
}

function applyTransform(
  route: string,
  locale: string = "de",
  fns: getTransformSetFunc[] = []
) {
  const closedRoute = route.endsWith("/") ? route : route + "/";
  for (const fn of fns) {
    const set = fn();
    set[locale]?.forEach(rule => {
      if (rule.startsWith) {
        const closedStartsWith = rule.startsWith.endsWith("/")
          ? rule.startsWith
          : rule.startsWith + "/";
        if (closedRoute.startsWith(closedStartsWith)) {
          route = rule.target;
        }
      }
      if (rule.matches && route === rule.matches) route = rule.target;
    });
  }
  return route;
}
