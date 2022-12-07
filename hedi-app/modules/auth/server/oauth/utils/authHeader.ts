import { IAuth, IAuthHeader } from "../../../types";

export const toCSRFObject = (csrfToken: string) => {
  return { "X-CSRF-Token": csrfToken };
};

export const toBearerObject = (accessToken: string) => {
  return { Authorization: "Bearer " + accessToken };
};

export const toAuthHeader = (
  args: Pick<IAuth, "accessToken" | "csrfToken">
) => {
  return {
    ...toBearerObject(args.accessToken),
    ...toCSRFObject(args.csrfToken),
  } as IAuthHeader;
};
