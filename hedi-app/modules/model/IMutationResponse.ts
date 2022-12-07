import { ErrorMap } from "./ErrorMap";

export interface IMutationResponse {
  success: boolean;
  errors?: ErrorMap | object;
}
