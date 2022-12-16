import { IValidateResetPasswordInfo } from "./IValidateResetPasswordInfo";

export interface IResetPasswordInfo extends IValidateResetPasswordInfo {
  password: string;
}
