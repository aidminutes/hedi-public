import { IMutationResponse } from "@/modules/model";
import { IActivateError } from "./IActivateError";

export interface IActivateResponse extends IMutationResponse {
  errors?: IActivateError;
}
