import {
  IProfessionalProfile,
  IProfessionalProfileInput,
  professionalProfileToInput,
} from "./IProfessionalProfile";

export interface IProfessional extends IProfessionalProfile {}

export type ProfessionalTypeName = "Professional";
export const ProfessionalTypeNameString: ProfessionalTypeName = "Professional";

export function isIProfessional(obj: any): obj is IProfessional {
  return obj && obj?.type === ProfessionalTypeNameString;
}

export interface IProfessionalInput extends IProfessionalProfileInput {}

export const ProfessionalInputDefault: IProfessionalInput = {
  givenName: "",
  profession: "", //TODO how to set a sensible default here?
  addresses: [],
  phones: [],
  emails: [],
  websites: [],
  languageLevels: [],
  consultationHours: [],
  services: [],
};

export function professionalToInput(
  professional: IProfessional
): IProfessionalInput {
  if (!professional) return ProfessionalInputDefault;
  const { ...professionalProfile } = professional;
  return {
    ...professionalProfileToInput(professionalProfile),
  };
}
