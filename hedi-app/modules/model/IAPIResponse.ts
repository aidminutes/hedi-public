import { IErrorResponse, IsIErrorResponse } from "../common/error";
import { IMutationResponse } from "./IMutationResponse";

export interface IAPIResponse<T> extends IMutationResponse {
  data?: T;
}

export function isIAPIResponse(obj: any): obj is IAPIResponse<any> {
  return obj && typeof obj === "object" && obj.hasOwnProperty("success");
}

export function isIErrorAPIResponse(
  obj: any
): obj is IAPIResponse<IErrorResponse> {
  return isIAPIResponse(obj) && IsIErrorResponse(obj.data);
}
