import { IMutationResponse } from "@/modules/model";
import { IResetPasswordSendEmailError } from "./IResetPasswordSendEmailError";

export interface IResetPasswordSendEmailResponse extends IMutationResponse {
  errors?: IResetPasswordSendEmailError;
}
