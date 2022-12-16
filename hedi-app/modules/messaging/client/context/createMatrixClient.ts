import { createClient } from "matrix-js-sdk";
import { messagingAPIBaseUrl } from "../../types/APIUrls";

export const createMatrixClient = () => {
  const client = createClient({
    baseUrl: (process.env.APP_URL ?? "") + messagingAPIBaseUrl,
    timelineSupport: true,
    fallbackICEServerAllowed: true,
  });

  client.setMaxListeners(100);
  return client;
};
