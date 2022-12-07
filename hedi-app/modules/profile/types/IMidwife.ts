import { ICareType } from "@/modules/networking/types/ICareType";
import {
  IProfessionalProfile,
  IProfessionalProfileInput,
  professionalProfileToInput,
} from "./IProfessionalProfile";

export interface IMidwife extends IProfessionalProfile {
  careTypes: ICareType[];
}

export type MidwifeTypeName = "Midwife";
export const MidwifeTypeNameString: MidwifeTypeName = "Midwife";

export function isIMidwife(obj: any): obj is IMidwife {
  return obj && obj?.type === MidwifeTypeNameString;
}

export interface IMidwifeInput extends IProfessionalProfileInput {
  careTypes: string[];
}

export const MidwifeInputDefault: IMidwifeInput = {
  givenName: "",
  profession: "", //TODO how to set a sensible default here?
  addresses: [],
  phones: [],
  emails: [],
  websites: [],
  languageLevels: [],
  consultationHours: [],
  services: [],
  careTypes: [],
};

export function midwifeToInput(midwife: IMidwife): IMidwifeInput {
  if (!midwife) return MidwifeInputDefault;
  const { careTypes, ...professionalProfile } = midwife;
  return {
    ...professionalProfileToInput(professionalProfile),
    careTypes: careTypes.map(item => item.route),
  };
}
