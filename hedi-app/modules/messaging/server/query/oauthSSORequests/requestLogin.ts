export interface ILoginResponse {
  user_id: string;
  access_token: string;
  device_id: string;
}

export async function requestLogin(
  loginToken: string
): Promise<ILoginResponse> {
  return fetch(`${process.env.MSG_URL}/_matrix/client/r0/login`, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify({
      type: "m.login.token",
      token: loginToken,
    }),
    headers: {
      connection: "keep-alive",
    },
  }).then(res => {
    return res.json();
  });
}
