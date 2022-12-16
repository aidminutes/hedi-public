import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as https from "https";
import { messagingAPIBaseUrl } from "../../types";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const msgAPI: NextApiHandler<any> = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // forward / proxy code
  // https://gist.github.com/cmawhorter/a527a2350d5982559bb6

  req.pause();
  const command = req.url?.replace(messagingAPIBaseUrl, "");
  // prohibited actions can be filtered here (e.g. roomCreate, invite)

  const { headers } = req;
  headers.host = process.env.MSG_DOMAIN;
  const options = {
    hostname: headers.host,
    path: command?.replace("pushrules?access", "pushrules/?access"), //next seemingly doesn't pass in the url as is, thus breaks some commands
    method: req.method,
    headers,
  };

  const connector = https.request(options, function (serverResponse) {
    serverResponse.pause();
    res.writeHead(serverResponse.statusCode ?? 500, serverResponse.headers);
    serverResponse.pipe(res, { end: true });
    serverResponse.resume();
  });
  req.pipe(connector, { end: true });
  req.resume();
};
export default msgAPI;
