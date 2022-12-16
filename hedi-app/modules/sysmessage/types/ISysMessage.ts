import { IEntity, IStateful, IAPIResponse } from "@/modules/model";

export interface ISysMessage extends IStateful {
  message: string;
  source: IEntity | IStateful;
}

export function isISysMessage(obj: any): obj is ISysMessage {
  return obj && obj.type === "SysMessage";
}

export type TransitionSysMessageInput = Pick<ISysMessage, "route"> & {
  transition: string;
};

export interface ITransitionSysMessageResponse
  extends IAPIResponse<ISysMessage> {}
