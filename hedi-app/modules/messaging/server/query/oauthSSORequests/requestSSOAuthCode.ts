export async function requestSSOAuthCode(
  url: string,
  cmsUserSession: string
): Promise<string> {
  return fetch(url, {
    redirect: "manual",
    headers: { Cookie: cmsUserSession },
  }).then(res => {
    const location = res.headers.get("location");
    if (!location) {
      throw new Error(
        "SSO AuthCode response is missing the redirect parameter"
      );
    }
    return location;
  });
}
