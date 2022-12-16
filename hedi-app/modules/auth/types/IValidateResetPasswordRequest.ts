import { IValidateResetPasswordInfo } from "./IValidateResetPasswordInfo";

export interface IValidateResetPasswordRequest
  extends IValidateResetPasswordInfo {
  lang?: string;
}
