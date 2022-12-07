import { IHTTPError } from "@/modules/common/error";

export interface IGQLError extends IHTTPError {
  errors?: Record<string, any>[];
}
