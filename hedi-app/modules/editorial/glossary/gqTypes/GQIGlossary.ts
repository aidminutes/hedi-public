import {
  gql,
  withArgs,
  withInlineFragment,
} from "@/modules/graphql/server/gq-ts";
import { GQPage } from "@/modules/common/server/gqTypes/GQIPage";
import { IGlossary } from "../types";
import { GQIGlossaryTerm } from "./GQIGlossaryTerm";

export const GQIGlossary: IGlossary = {
  glossaryTerms: [GQIGlossaryTerm],
};

export const GQGlossaryTerm = withInlineFragment(
  GQIGlossaryTerm,
  "GlossaryTerm"
);

export const getGlossaryDefinitionGQ = gql`
  query getGlossaryDefinition($lang: String!){
    ${withArgs({ pagesById: GQPage }, "pagesById", {
      ids: ["glossary"],
      lang: "$lang",
    })}
  }
`;

export const getGlossaryTermGQ = gql`
  query getGlossaryTerm(
    $routes: [String!]!
    $lang: String
  ) {
    ${withArgs({ glossaryTerms: GQGlossaryTerm }, "glossaryTerms", {
      routes: "$routes",
      lang: "$lang",
    })}
  }
`;
