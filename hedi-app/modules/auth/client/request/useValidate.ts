import { jsonPost } from "@/modules/common/utils";
import {
  IRegisterRequest,
  IRegisterResponse,
  validateAPIUrl,
} from "../../types";

export async function useValidate(info: IRegisterRequest) {
  const validateResult = await jsonPost<IRegisterResponse>(
    validateAPIUrl,
    info
  );
  return validateResult;
}
