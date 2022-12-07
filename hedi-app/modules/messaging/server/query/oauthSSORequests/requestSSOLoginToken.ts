export async function requestSSOLoginToken(
  url: string,
  msgInitCookie: string
): Promise<string> {
  return fetch(url, {
    redirect: "manual",
    headers: {
      Cookie: msgInitCookie,
    },
  }).then(res => {
    const location = res.headers.get("location");
    if (!location) {
      throw new Error(
        "SSO LoginToken response is missing the redirect parameter"
      );
    }
    const loginToken = location.match(/loginToken=(\S+)$/)?.[1];
    if (!loginToken) {
      throw new Error("SSO LoginToken response did not contain a login token");
    }
    return loginToken;
  });
}
