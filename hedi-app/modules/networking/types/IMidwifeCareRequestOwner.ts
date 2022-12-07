import { IPersonal } from "@/modules/profile/types/IPersonal";

export type OwnerProfile = Pick<
  IPersonal,
  | "addresses"
  | "label"
  | "route"
  | "image"
  | "type"
  | "birthDate"
  | "emails"
  | "languageLevels"
  | "phones"
>;
