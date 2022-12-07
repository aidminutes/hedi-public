import { IMutationResponse } from "@/modules/model";
import { IResetPasswordError } from "./IResetPasswordError";

export interface IResetPasswordResponse extends IMutationResponse {
  errors?: IResetPasswordError;
}
