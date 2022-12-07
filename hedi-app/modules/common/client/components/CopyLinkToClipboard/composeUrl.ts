export function composeUrl(route: string) {
  if (!route) return route;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl) throw Error("ENV: app url undefined");

  return baseUrl.endsWith("/") || route.startsWith("/")
    ? `${baseUrl}${route}`
    : `${baseUrl}/${route}`;
}
