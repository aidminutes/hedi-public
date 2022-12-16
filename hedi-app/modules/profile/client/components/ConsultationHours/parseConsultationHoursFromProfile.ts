import {
  IConsultationHour,
  UserProfile,
  IOrganisation,
} from "@/modules/profile/types";

export const parseConsultationHoursFromProfile = (
  profile: UserProfile | IOrganisation
): IConsultationHour[] => {
  const consultationHours: IConsultationHour[] = [];
  if ("consultationHours" in profile && profile.consultationHours?.length > 0)
    return profile.consultationHours;

  return consultationHours;
};
