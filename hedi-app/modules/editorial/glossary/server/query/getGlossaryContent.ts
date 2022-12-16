import { logAndFallback } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIGlossary } from "../../gqTypes/GQIGlossary";
import { IGlossary, IGlossaryTerm } from "../../types";

const getGlossaryContentQuery = gql`
  query getGlossaryContent(
    $lang: String!
  ) { 
    ${withArgs(GQIGlossary, "glossaryTerms", { lang: "$lang" })} 
  }
`;

export async function getGlossaryContent(lang: string): Promise<IGlossary> {
  const glossary = await serviceGQuery<IGlossary>(getGlossaryContentQuery, {
    lang,
  }).then(data =>
    logAndFallback(data, { glossaryTerms: [] as IGlossaryTerm[] } as IGlossary)
  );

  if (!glossary) throw new Error("Error while fetching Profile Page data");
  return glossary as IGlossary;
}
