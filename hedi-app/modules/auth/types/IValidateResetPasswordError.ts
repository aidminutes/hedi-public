import { IValidateResetPasswordInfo } from "./IValidateResetPasswordInfo";

export interface IValidateResetPasswordError
  extends IValidateResetPasswordInfo {
  generic?: string;
}
