export const distanceRoutePrefix = "/distance/";

export const getDistanceRoute = (distance: number) =>
  distanceRoutePrefix + distance;

export const getDistanceFromRoute = (route?: string) => {
  if (!route) return undefined;
  const result = parseInt(route.replace(distanceRoutePrefix, ""));
  return isNaN(result) ? undefined : result;
};

export const defaultDistance = getDistanceRoute(20);
