import { IEntityTranslated } from "@/modules/model";
import {
  ILanguageLevel,
  ILanguageLevelInput,
  languageLevelToInput,
  IAddress,
  IAddressInput,
  addressToInput,
  IPhone,
  IPhoneInput,
  phoneToInput,
  IEmail,
  IEmailInput,
  emailToInput,
} from "./dataTypes";

import { IImage } from "@/modules/media/types";
import { PersonalTypeName, PersonalTypeNameString } from "./IPersonal";
import { ProfessionalTypeNameString } from "./IProfessional";
import { MidwifeTypeNameString } from "./IMidwife";
import { IOrganisation, OrganisationTypeNameString } from "./IOrganisation";
import { UserProfile } from "./UserProfile";
import { BusinessProfileType } from "./IBusinessProfile";

export type ProfileType = BusinessProfileType | PersonalTypeName;

export interface IProfile extends IEntityTranslated {
  image: IImage;
  languageLevels: ILanguageLevel[];
  addresses: IAddress[];
  phones: IPhone[];
  emails: IEmail[];
}

export function isIProfile(obj: any): obj is IOrganisation | UserProfile {
  const profileTypeNames = [
    PersonalTypeNameString,
    MidwifeTypeNameString,
    ProfessionalTypeNameString,
    OrganisationTypeNameString,
  ];
  return obj && !!obj.type && profileTypeNames.includes(obj.type);
}

export interface IProfileInput {
  //image: Image
  languageLevels: ILanguageLevelInput[];
  addresses: IAddressInput[];
  phones: IPhoneInput[];
  emails: IEmailInput[];
}

export function profileToInput(profile: IProfile): IProfileInput {
  const { addresses, phones, emails, languageLevels } = profile;
  return {
    addresses: addresses ? addresses.map(addressToInput) : [],
    phones: phones.map(phoneToInput),
    emails: emails.map(emailToInput),
    languageLevels: languageLevels.map(languageLevelToInput),
  };
}
