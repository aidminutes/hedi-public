import { IPersonal, IPersonalInput } from "./IPersonal";
import { IProfessional, IProfessionalInput } from "./IProfessional";
import { IMidwife, IMidwifeInput } from "./IMidwife";

export type UserProfile = IPersonal | IProfessional | IMidwife;

// NOTE defines a combined type of IPersonalInput and IProfessionalInput
// where the fields, which both have in common are combined
// and the ones which are available only on one optional
export type UserProfileInput = Partial<
  IPersonalInput & IProfessionalInput & IMidwifeInput
>;

export const UserProfileInputDefault: UserProfileInput = {
  givenName: "",
  addresses: [],
  phones: [],
  emails: [],
  languageLevels: [],
};
