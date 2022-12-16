import { ErrorMap } from "@/modules/model";
import { GraphQLError } from "graphql";

export interface IHTTPError {
  status: number;
  message?: string;
}

export interface IHTTPErrorWithGraphQLErrors {
  status: number;
  errors: GraphQLError[];
}

export interface IErrorResponse {
  success: boolean;
  errors: ErrorMap;
}

export function IsIHTTPError(arg: any): arg is IHTTPError {
  if (arg == null || typeof arg !== "object") return false;
  return "status" in arg && "message" in arg;
}

export function IsIHTTPErrorWithGraphQLErrors(
  arg: any
): arg is IHTTPErrorWithGraphQLErrors {
  if (arg == null || typeof arg !== "object") return false;
  if (!("errors" in arg) || typeof arg["errors"] !== "object") return false;
  return (
    "status" in arg &&
    "errors" in arg &&
    Array.isArray(arg["errors"]) &&
    "message" in arg["errors"][0]
  );
}

export function IsIErrorResponse(arg: any): arg is IErrorResponse {
  if (arg == null || typeof arg !== "object") return false;
  if (!("errors" in arg) || typeof arg["errors"] !== "object") return false;
  return "success" in arg && "errors" in arg;
}
