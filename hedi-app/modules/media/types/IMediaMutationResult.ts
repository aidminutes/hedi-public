import { IEntity } from "@/modules/model";
import { IMutationResponse } from "@/modules/model/IMutationResponse";

export interface IMediaMutationResult extends IMutationResponse {
  media?: Pick<IEntity, "route">;
}
