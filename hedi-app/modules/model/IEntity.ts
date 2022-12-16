export interface IEntity {
  route: string;
  label: string;
}

export const implementsIEntity = (obj: any) => !!obj && obj.route && obj.label;

export function isIEntity(obj: any): obj is IEntity {
  return implementsIEntity(obj);
}
