import { IHTTPError, IsIHTTPError } from "./types";

export function responseToIHTTPError(
  response: Response,
  message?: string
): IHTTPError {
  const { status, statusText } = response;
  return {
    status,
    message: message ?? statusText,
  };
}

type WithIHTTPError<T, E extends IHTTPError> = T | E;

export function logAndNull<T, E extends IHTTPError>(obj: WithIHTTPError<T, E>) {
  if (IsIHTTPError(obj)) {
    console.error(obj);
    return null;
  }
  return obj as Exclude<T | E, E>;
}

export function logAndFallback<T, E extends IHTTPError>(
  obj: WithIHTTPError<T, E>,
  fallback: T
) {
  if (IsIHTTPError(obj)) {
    console.error(obj);
    return fallback;
  }
  return obj as Exclude<T | E, E>;
}

export function throwOnError<T, E extends IHTTPError>(
  obj: WithIHTTPError<T, E>
) {
  if (IsIHTTPError(obj)) {
    const err = new Error(obj.message ?? `HTTP ${obj.status} error`);
    err.message = JSON.stringify(obj);
    throw err;
  }
  return obj;
}
