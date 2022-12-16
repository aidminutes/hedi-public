import { IMutationResponse } from "@/modules/model";
import { IRegisterError } from "./IRegisterError";

export interface IRegisterResponse extends IMutationResponse {
  errors?: IRegisterError;
}
