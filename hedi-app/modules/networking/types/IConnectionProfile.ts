import { IBusinessProfile, IMidwife, IPersonal } from "@/modules/profile/types";

export type IConnectionProfile = Pick<
  IPersonal,
  "type" | "label" | "addresses" | "route" | "image" | "familyName" | "givenName" | "namePrefix" | "emails" | "phones" 
> &
  Partial<
    Pick<IBusinessProfile, "profession" | "services" | "languageLevels" | "websites" | "consultationHours">
  > &
  Partial<Pick<IMidwife, "careTypes">>;
