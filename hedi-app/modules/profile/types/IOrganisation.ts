import { PartialBy } from "@/modules/common/utils";
import {
  IBusinessProfile,
  IBusinessProfileInput,
  businessProfileToInput,
} from "./IBusinessProfile";

export interface IOrganisation
  extends PartialBy<IBusinessProfile, "addresses"> {
  name: string;
  members: IBusinessProfile[];
}

export type OrganisationTypeName = "Organisation";
export const OrganisationTypeNameString: OrganisationTypeName = "Organisation";

export function isIOrganisation(obj: any): obj is IOrganisation {
  return obj && obj?.type === OrganisationTypeNameString;
}

export interface IOrganisationInput extends IBusinessProfileInput {
  name: string;
  members?: string[];
}

export const OrganisationInputDefault: IOrganisationInput = {
  name: "",
  profession: "", //TODO how to set a sensible default here?
  addresses: [],
  phones: [],
  emails: [],
  websites: [],
  languageLevels: [],
  consultationHours: [],
  services: [],
};

export function organisationToInput(
  organisation: IOrganisation
): IOrganisationInput {
  const { name, members, ...businessProfile } = organisation;
  const businessProfileInput = businessProfileToInput({
    ...businessProfile,
    addresses: businessProfile.addresses || [],
  });
  if (members) {
    return {
      name,
      members: members.map(p => p.route),
      ...businessProfileInput,
    };
  } else {
    return {
      name,
      ...businessProfileInput,
    };
  }
}
