import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { IBusinessProfile } from "../../types";
import { GQIProfile } from "./GQIProfile";
import { GQProfession } from "./GQProfession";
import { GQIConsultationHour } from "./GQIConsultationHour";
import { GQService } from "./GQService";
import { GQWebsite } from "./GQWebsite";

export const GQBusinessProfile: IBusinessProfile = {
  ...GQIProfile,
  websites: [GQWebsite],
  consultationHours: [GQIConsultationHour],
  profession: GQProfession,
  services: [GQService],
};

export const getBusinessProfilesGQ = gql`
query getBusinessProfiles($lang: String!) {
  ${withArgs({ professionals: GQBusinessProfile }, "professionals", {
    lang: "$lang",
  })}
  ${withArgs({ midwives: GQBusinessProfile }, "midwives", {
    lang: "$lang",
  })}
  ${withArgs({ organisations: GQBusinessProfile }, "organisations", {
    lang: "$lang",
  })}
}
`;
