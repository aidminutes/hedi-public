import { IWithType } from "./IWithType";
import { isIState, IState } from "./IState";
import { ITransition } from "./ITransition";

export interface IStateful extends IWithType {
  route: string;
  state: IState;
  transitions: ITransition[];
}

export function isIStateful(obj: any): obj is IStateful {
  return (
    obj &&
    typeof obj.route === "string" &&
    Array.isArray(obj.transitions) &&
    isIState(obj.state)
  );
}
