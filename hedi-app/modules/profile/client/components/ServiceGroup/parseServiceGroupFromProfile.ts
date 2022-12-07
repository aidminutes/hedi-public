import { IService, UserProfile, IOrganisation } from "@/modules/profile/types";

export const parseServiceGroupFromProfile = (
  profile: UserProfile | IOrganisation
): IService[] => {
  const services: IService[] = [];
  if ("services" in profile && profile.services.length > 0)
    return profile.services;

  return services;
};
