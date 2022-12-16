export interface IWithType {
  type: string;
}

export const implementsIWithType = (obj: any) => !!(obj && obj.type);

export function isIWithType(obj: any): obj is IWithType {
  return implementsIWithType(obj);
}
