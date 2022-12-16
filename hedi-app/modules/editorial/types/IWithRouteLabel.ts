export interface IWithRouteLabel {
  routelabel: string;
}

export const implementsIWithRouteLabel = (obj: any) =>
  !!(obj && obj.routelabel);

export function isIWithRouteLabel(obj: any): obj is IWithRouteLabel {
  return implementsIWithRouteLabel(obj);
}
