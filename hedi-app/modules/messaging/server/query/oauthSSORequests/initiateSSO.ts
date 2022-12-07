export interface IInitiateSSOResponse {
  url: string;
  cookie: string;
}

export async function initiateSSO(
  redirectPath?: string
): Promise<IInitiateSSOResponse> {
  const redirectUrl = new URL(redirectPath ?? "", process.env.APP_URL);
  const requestURL = `${
    process.env.MSG_URL
  }/_matrix/client/r0/login/sso/redirect?redirectUrl=${encodeURIComponent(
    redirectUrl.href
  )}`;

  return fetch(requestURL, {
    redirect: "manual",
    headers: {
      connection: "keep-alive",
    },
  }).then(res => {
    const location = res.headers.get("location");
    if (!location)
      throw new Error(
        "SSO initiate response is missing the redirect parameter"
      );

    const cookie = res.headers.get("set-cookie")?.match(/(\S+=\S+);/)?.[1];
    if (!cookie)
      throw new Error("SSO initiate response is missing the cookie parameter");

    return {
      url: location,
      cookie,
    } as IInitiateSSOResponse;
  });
}
