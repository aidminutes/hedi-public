import {
  IEntity,
  IMutationResponse,
  IStateful,
  isIState,
} from "@/modules/model";
import { ILanguage } from "@/modules/common/types/ILanguage";
import { IPregnancyEntry, IService } from "@/modules/profile/types";
import { ICareType } from "./ICareType";
import { IMidwifeCareConnection } from "./IConnection";
import { OwnerProfile } from "./IMidwifeCareRequestOwner";

export interface MidwifeCareRequest extends IEntity, IStateful {
  created: Date;
  careTypes: ICareType[];
  languages: ILanguage[];
  services: IService[];
  pregnancy: IPregnancyEntry;
  ownerProfile: OwnerProfile;
  body: string;
  recipients: IMidwifeCareConnection[];
}

export function isMidwifeCareRequest(obj: any): obj is MidwifeCareRequest {
  return obj && typeof obj.route === "string" && isIState(obj.state);
}

export interface IMidwifeCareRequestInput {
  careTypes?: string[];
  languages?: string[];
  services?: string[];
  recipients?: string[];
}

export interface IUpsertMidwifeCareRequestInput
  extends IMidwifeCareRequestInput {
  route?: string;
  body?: string;
}

export interface IActionMidwifeCareRequestInput {
  route: string;
  transition: string;
}

export interface IUpsertMidwifeCareRequestResponse extends IMutationResponse {
  data?: MidwifeCareRequest;
}

export interface ITransitionMidwifeCareRequestResponse
  extends IMutationResponse {
  data?: MidwifeCareRequest;
}
