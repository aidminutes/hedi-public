import { logAndFallback } from "@/modules/common/error";
import { IPage } from "@/modules/common/types";
import { GQIPage } from "@/modules/common/server/gqTypes/GQIPage";
import { serviceGQuery } from "@/modules/graphql";
import { gql, gqPick, withArgs } from "@/modules/graphql/server/gq-ts";

type GlossaryDefinitionResponse = {
  pagesById: Pick<IPage, "components">[];
};

export const glossaryDefinitionResponseGQ: GlossaryDefinitionResponse = {
  pagesById: [gqPick(GQIPage, ["components"])],
};

export const getGlossaryDefinitionQuery = gql`
  query getGlossaryDefinition(
    $lang: String!
  ) { 
    ${withArgs(glossaryDefinitionResponseGQ, "pagesById", {
      ids: ["glossary"],
      lang: "$lang",
    })} 
  }
`;

export async function getGlossaryDefinition(
  lang: string
): Promise<Pick<IPage, "components">> {
  const { pagesById } = await serviceGQuery<GlossaryDefinitionResponse>(
    getGlossaryDefinitionQuery,
    {
      lang,
    }
  ).then(data =>
    logAndFallback(data, { pagesById: [] } as GlossaryDefinitionResponse)
  );

  if (pagesById.length < 1)
    throw new Error("Error while fetching glossary definition data");
  return pagesById[0];
}
