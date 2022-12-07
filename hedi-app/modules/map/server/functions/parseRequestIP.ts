import { NextApiRequest } from "next";

export function parseRequestIP(req: NextApiRequest): string | undefined {
  const xRealIpID = req.rawHeaders.indexOf("X-Real-Ip");
  const xRealIp = xRealIpID > -1 ? req.rawHeaders[xRealIpID + 1] : undefined;

  const xForwardedForID = req.rawHeaders.indexOf("X-Forwarded-For");
  const xForwardedFor =
    xForwardedForID > -1 ? req.rawHeaders[xForwardedForID + 1] : undefined;

  const remoteIp =
    req.connection.remoteFamily !== "IPv6" ? req.connection.remoteAddress : "";

  const ip = xRealIp ?? xForwardedFor ?? remoteIp;
  return ip;
}
