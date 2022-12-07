import { IMutationResponse } from "@/modules/model";
import { IValidateResetPasswordError } from "./IValidateResetPasswordError";

export interface IValidateResetPasswordResponse extends IMutationResponse {
  errors?: IValidateResetPasswordError;
}
