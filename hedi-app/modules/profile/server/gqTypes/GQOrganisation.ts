import { GQString, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQIMutationResponse } from "@/modules/model/server";
import { GQBusinessProfile } from "./GQBusinessProfile";
import { IOrganisation, IUpsertOrganisationResponse } from "../../types";

const gqOrganisation: IOrganisation = {
  ...GQBusinessProfile,
  name: GQString,
  members: [GQBusinessProfile],
};

export const GQOrganisation = withInlineFragment(
  gqOrganisation,
  "Organisation"
);

export const GQUpsertOrganisationResponse: IUpsertOrganisationResponse = {
  ...GQIMutationResponse,
  data: GQOrganisation,
  route: GQString,
};
