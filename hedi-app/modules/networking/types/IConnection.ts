import {
  IAPIResponse,
  IEntity,
  IWithType,
  isIState,
  IStateful,
  IMutationResponse,
} from "@/modules/model";
import { MidwifeCareRequestEntry } from "./MidwifeCareRequestEntry";
import { IConnectionProfile } from "./IConnectionProfile";

export interface IConnection extends IStateful {
  sender: Pick<IEntity, "route"> & IWithType;
  recipient: Pick<IEntity, "route"> & IWithType;

  created: Date;
  changed: Date;
}

export interface IOrganisationConnection extends IConnection {
  sender: IConnectionProfile;
  recipient: IConnectionProfile;
}

export interface IMidwifeCareConnection extends IConnection {
  sender: MidwifeCareRequestEntry;
  recipient: IConnectionProfile;
}

export type Connection = IOrganisationConnection | IMidwifeCareConnection;

export function isIConnection(obj: any): obj is IConnection {
  return obj && typeof obj.route === "string" && isIState(obj.state);
}

export type TransitionConnectionInput = Pick<IConnection, "route"> & {
  transition: string;
};

export type InsertConnectionInput = {
  sender: string;
  recipient: string;
};

export interface ITransitionConnectionResponse
  extends IAPIResponse<IConnection> {}

export interface ITransitionOrganisationConnectionResponse
  extends IAPIResponse<IOrganisationConnection> {}

export interface ITransitionMidwifeCareConnectionResponse
  extends IAPIResponse<IMidwifeCareConnection> {}

export interface ICareConnectionRoomResponse extends IMutationResponse {
  roomId?: string;
}
