import React from "react";
import { LabeledList } from "@/modules/common/client/components/LabeledList";
import {
  IProfileEntry,
  IProfileEntryDefinition,
  IWithDistanceAndServiceCount,
} from "../../../../types";
import {
  IProfileCardDefinition,
  ProfileCard,
  ProfileCardType,
} from "../../ProfileCard";
import { ContactInfo } from "../../ProfileCard/ContactInfo";
import { ProfileCardDetailsGrid } from "../../ProfileCard/ProfileCardDetailsGrid";
import { getProfileCardType } from "../../Profile/getProfileCardType";

export const RelatedProfile: React.FC<
  IProfileEntry &
    Pick<IWithDistanceAndServiceCount, "distance"> &
    IProfileEntryDefinition &
    IProfileCardDefinition
> = props => {
  const {
    label,
    route,
    profession,
    distance,
    services,
    servicesTitle,
    distanceTemplate,
    shortDistanceText,
  } = props;

  return (
    <>
      <ProfileCard
        className="hedi--profile-card__related-profiles"
        title={label}
        profileType={getProfileCardType(
          profession?.forProfileType[0] || "Organisation"
        )}
        profession={profession}
        distanceInKm={distance ? Number.parseInt(distance) : undefined}
        distanceTemplate={distanceTemplate}
        shortDistanceText={shortDistanceText}
        renderDetails={() => {
          return (
            <ProfileCardDetailsGrid>
              <div className="hedi--profile-card-details-grid__column">
                <ContactInfo {...props} />
              </div>
              {services && (
                <LabeledList
                  label={servicesTitle}
                  listItems={services || []}
                  isChecklist
                />
              )}
            </ProfileCardDetailsGrid>
          );
        }}
        href={route || "/"}
        showImage={false}
      />
    </>
  );
};
