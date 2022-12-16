import { IWithType } from "./IWithType";

export interface ITransition extends IWithType {
  route: string;
  kind: string;
  label: string;
  longLabel: string;
  body: string;
}

export function isITransition(obj: any): obj is ITransition {
  return (
    obj && typeof obj.route === "string" && "kind" in obj && "longLabel" in obj
  );
}
