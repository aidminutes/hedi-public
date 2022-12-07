import { serviceGQuery } from "@/modules/graphql";
import { gql } from "@/modules/graphql/server/gq-ts";
import { ILanguage, IPage } from "@/modules/common/types";
import { logAndFallback } from "../../../common/error";
import { DefinitionCache } from "../../../common/server/cache/DefinitionCache";
import { IShellDefinition } from "../../types";
import { getShellDefinition } from "../../client/components/Shell/getShellDefinition";
import { GQShellResponse } from "../gqts/GQShellResponse";

export type ShellResponse = {
  shellPage: Pick<IPage, "components">[];
  languages: ILanguage[];
};

export async function getShell(
  lang: string = "de",
  locales: string[] = ["de"]
): Promise<IShellDefinition> {
  const query = gql`
    query getShell($lang: String!, $locales: [String!]!) {
    ${GQShellResponse}
  }`;
  const fetcher = serviceGQuery<ShellResponse>(query, { lang, locales }).then(
    data => {
      const { shellPage, languages } = logAndFallback(data, {
        shellPage: [{ components: [] }],
        languages: [],
      } as ShellResponse);
      const components = shellPage?.[0].components ?? [];
      return getShellDefinition(components, languages, lang);
    }
  );

  return DefinitionCache.get("shell", lang, fetcher);
}
