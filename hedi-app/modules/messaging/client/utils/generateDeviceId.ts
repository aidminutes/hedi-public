import { v5 as uuidv5 } from "uuid";

export function generateDeviceId(userId: string) {
  const appURL = process.env.NEXT_PUBLIC_APP_URL ?? "HEDI_APP";
  const namespace = uuidv5(appURL, uuidv5.URL);
  const ua = navigator.userAgent;
  return uuidv5(userId + ua, namespace);
}
