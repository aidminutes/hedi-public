import { logAndNull } from "@/modules/common/error";
import { getLangByRoute } from "@/modules/common/utils";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIGlossary } from "../../gqTypes/GQIGlossary";
import { IGlossary, IGlossaryTerm } from "../../types";

const getGlossaryTermQuery = gql`
  query getGlossaryTerm(
    $routes: [String!]!
    $lang: String!
  ) { 
    ${withArgs(GQIGlossary, "glossaryTerms", {
      routes: "$routes",
      lang: "$lang",
    })} 
  }
`;

export async function getGlossaryTerm(
  route: string
): Promise<IGlossaryTerm | null> {
  const lang = getLangByRoute(route);

  return serviceGQuery<IGlossary>(getGlossaryTermQuery, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.glossaryTerms?.[0] ?? null);
}
