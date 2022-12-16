import { logAndFallback } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IOrganisation, IProfileEntry } from "../../types";
import { GQOrganisation } from "../gqTypes/GQOrganisation";
import { transformProfileToEntry } from "../../utils/transformProfileToEntry";

type OrganisationListResponse = {
  organisations: IOrganisation[];
};

const getOrganisationListGQ = gql`
query getOrganisationList($lang: String!) {
  ${withArgs({ organisations: GQOrganisation }, "organisations", {
    lang: "$lang",
  })}
}
`;

export async function getOrganisationEntryList(
  lang: string
): Promise<IProfileEntry[]> {
  // gql endpoint should probably be user later, to respect
  // if (!client) client = await getServiceClient(GQLEndpoint.Internal);

  const { organisations } = await serviceGQuery<OrganisationListResponse>(
    getOrganisationListGQ,
    {
      lang,
    }
  ).then(data =>
    logAndFallback(data, {
      organisations: [],
    } as OrganisationListResponse)
  );

  return organisations
    .sort((a, b) =>
      a.label.localeCompare(b.label, lang, { ignorePunctuation: true })
    )
    .map(org =>
      transformProfileToEntry({ ...org, addresses: org.addresses || [] })
    );
}
