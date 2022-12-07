import { basicAuth } from "@/modules/auth/server";

export const requestFromSolr = (requestHandler: string, reqBody?: BodyInit) => {
  if (!process.env.SOLR_URL) throw new Error("[SOLR] no URL available");
  const solrEndpoint = process.env.SOLR_URL + requestHandler;

  return fetch(solrEndpoint, {
    method: "post",
    body: reqBody,
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: basicAuth(process.env.SOLR_USER, process.env.SOLR_SECRET),
    }),
  });
};
