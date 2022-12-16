import { NextApiResponse, NextApiRequest } from "next";
import {
  IsIHTTPError,
  IHTTPError,
  IsIHTTPErrorWithGraphQLErrors,
  IHTTPErrorWithGraphQLErrors,
} from "../error";
import { IAuthHeader } from "@/modules/auth/types";
import { ErrorMap, IAPIResponse, isIAPIResponse } from "@/modules/model";

interface ErrorSentStatus {
  isErrorSent: boolean;
}

export const isErrorThatCanBeHandled = (
  obj: any
): obj is IHTTPError | IHTTPErrorWithGraphQLErrors =>
  IsIHTTPError(obj) || IsIHTTPErrorWithGraphQLErrors(obj);

export const sendAPIResult = (
  nextApiResponse: NextApiResponse<any>,
  responseObject: any,
  nullResultPossible: boolean = false
) => {
  if (IsIHTTPError(responseObject)) {
    sendAPIHttpError(nextApiResponse, responseObject);
    return;
  }

  if (IsIHTTPErrorWithGraphQLErrors(responseObject)) {
    sendAPIHttpErrorWithGraphQLErrors(nextApiResponse, responseObject);
    return;
  }

  if (
    (responseObject !== null && responseObject !== undefined) ||
    nullResultPossible
  ) {
    sendAPISuccess(
      nextApiResponse,
      isIAPIResponse(responseObject)
        ? responseObject
        : { success: true, data: responseObject }
    );
    return;
  }

  sendAPIServerError(nextApiResponse);
};

export function sendAPIServerError(
  nextApiResponse: NextApiResponse,
  errorText?: string
) {
  nextApiResponse.status(500).json({
    success: false,
    errors: { general: errorText ?? "Server Error" },
  } as IAPIResponse<any>); // TODO return language specific error
}

export function sendAPISuccess(
  nextApiResponse: NextApiResponse,
  result: IAPIResponse<any>
) {
  nextApiResponse.status(200).json(result);
}

export function sendAPIUnauthorized(nextApiResponse: NextApiResponse) {
  nextApiResponse.status(401).json({
    success: false,
    errors: { generic: "Unauthorized" },
  } as IAPIResponse<any>); // TODO: error text / handling
}

export function sendAPIHttpError(
  nextApiResponse: NextApiResponse,
  result: IHTTPError
) {
  nextApiResponse.status(result.status).json({
    success: false,
    errors: { http: result.message },
  } as IAPIResponse<any>);
}

export function sendAPIHttpErrorWithGraphQLErrors(
  nextApiResponse: NextApiResponse,
  result: IHTTPErrorWithGraphQLErrors
) {
  nextApiResponse.status(result.status).json({
    success: false,
    errors: result.errors.reduce((o, e) => {
      o[e.message] = e.originalError?.message ?? "";
      return o;
    }, {} as ErrorMap),
  } as IAPIResponse<any>);
}

export function sendAPINoBody(nextApiResponse: NextApiResponse) {
  nextApiResponse.status(400).json({
    success: false,
    errors: { generic: "no entity to save" },
  } as IAPIResponse<any>); // TODO: how to return error (raw / translated)
}

export async function sendAPIErrorIfUnauthorized(
  req: NextApiRequest,
  res: NextApiResponse,
  authHeader: IAuthHeader | null
): Promise<ErrorSentStatus> {
  if (!authHeader) {
    sendAPIUnauthorized(res);
    return { isErrorSent: true };
  }

  return { isErrorSent: false };
}

export function sendAPIErrorIfEmpty(
  req: NextApiRequest,
  res: NextApiResponse
): ErrorSentStatus {
  if (!req.body) {
    sendAPINoBody(res);
    return { isErrorSent: true };
  }

  return { isErrorSent: false };
}

export async function sendAPIErrorIfEmptyOrUnauthorized(
  req: NextApiRequest,
  res: NextApiResponse,
  authHeader: IAuthHeader | null
): Promise<ErrorSentStatus> {
  const emptyErrorStatus = sendAPIErrorIfEmpty(req, res);
  if (emptyErrorStatus.isErrorSent) {
    return emptyErrorStatus;
  }

  const unauthorizedErrorStatus = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (unauthorizedErrorStatus.isErrorSent) {
    return unauthorizedErrorStatus;
  }

  return { isErrorSent: false };
}
